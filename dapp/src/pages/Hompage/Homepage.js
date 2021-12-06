import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

import { abi, address } from '../../contract';
import { CURRENCY, ACTION, getBlockPerSec, round3decimal } from '../../utils';
import { useError, useWeb3 } from '../../hooks';

import { CustomButton, CustomBox, CustomError, SkeletonBox } from '../../components/ui-components';
import HomepageSkeleton from './HomepageSkeleton';
import Header from '../../components/Header/Header';
import TransactionModal from '../../components/TransactionModal/TransactionModal';
import MainArea from '../../components/MainArea/MainArea';

const Homepage = () => {
  const { web3, account, connect, disconnect } = useWeb3();
  const { isError, errorMessage, handleError, handleCloseError } = useError();
  const contract = new web3.eth.Contract(abi, address);

  const [isTransacting, setTransacting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [mySupply, setMySupply] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [apy, setApy] = useState(0);

  const [currency, setCurrency] = useState(CURRENCY.ETH);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [cEthBalance, setCEthBalance] = useState(0);
  const [receiving, setReceiving] = useState(0);

  const [txHash, setTxHash] = useState('');
  const [action, setAction] = useState(ACTION.SUPPLY);
  const [actionValue, setActionValue] = useState(0);

  const fetchMyEthBalance = async () => {
    const amount = await web3.eth.getBalance(account);
    setEthBalance(round3decimal(web3.utils.fromWei(amount, 'ether')));
  };

  const fetchReceiving = (amount, from) => {
    if (amount === 0) return 0;
    let res;
    if (from === CURRENCY.ETH) res = amount / exchangeRate;
    if (from === CURRENCY.cETH) res = amount * exchangeRate;
    setReceiving(round3decimal(res));
  };

  const fetchContractDetail = async () => {
    var contract = new web3.eth.Contract(abi, address);

    const values = await Promise.all([
      contract.methods.exchangeRateCurrent().call(),
      contract.methods.balanceOf(account).call(),
      contract.methods.totalSupply().call(),
    ]);
    let [exchange_rate_current, cETH_balance, cETH_total_supply] = values;
    const cTokenDecimals = 8;
    const underlyingDecimal = 18;
    const mantissa = 18 + underlyingDecimal - cTokenDecimals;
    const exchangeRate = exchange_rate_current / Math.pow(10, mantissa);

    const my_supply_eth = cETH_balance * 10 ** -cTokenDecimals * exchangeRate;
    const total_supply_eth = cETH_total_supply * 10 ** -cTokenDecimals * exchangeRate;

    setExchangeRate(exchangeRate);
    setCEthBalance(round3decimal(+cETH_balance * 10 ** -+cTokenDecimals));
    setMySupply(round3decimal(my_supply_eth));
    setTotalSupply(round3decimal(total_supply_eth));
  };

  const fetchAPY = async () => {
    const RikebyBlockPerSec = await getBlockPerSec(web3);
    const BlockPerDay = RikebyBlockPerSec * 24 * 60 * 60;
    const SupplyRatePerBlock = await contract.methods.supplyRatePerBlock().call();

    const SupplyAPY = (Math.pow((SupplyRatePerBlock / 1e18) * BlockPerDay + 1, 365) - 1) * 100;
    setApy(round3decimal(SupplyAPY));
  };

  const supply = (actionValue) => {
    return contract.methods.mint().send({ from: account, value: actionValue * 10 ** 18 });
  };

  const withdraw = (actionValue) => {
    return contract.methods.redeem(actionValue * 10 ** 8).send({ from: account });
  };

  const transacting = async () => {
    try {
      if (actionValue === 0) return;

      let res;
      setTransacting(true);
      if (action === ACTION.SUPPLY) {
        res = await supply(actionValue);
      } else if (action === ACTION.WITHDRAW) {
        res = await withdraw(actionValue);
      }

      setTxHash(res.transactionHash);
      setTransacting(false);
      setModalOpen(true);
    } catch (err) {
      handleError(err);
      setTransacting(false);
    }
  };

  const handleActionSupply = () => {
    setAction(ACTION.SUPPLY);
    setCurrency(CURRENCY.ETH);
  };

  const handleActionWithdraw = () => {
    setAction(ACTION.WITHDRAW);
    setCurrency(CURRENCY.cETH);
  };

  useEffect(() => {
    if (account) {
      fetchMyEthBalance();
      fetchContractDetail();
      fetchAPY();
    }
  }, [account, modalOpen]);

  useEffect(() => {
    fetchReceiving(actionValue, currency);
  }, [actionValue, currency]);

  return (
    <>
      <Header account={account} connect={connect} disconnect={disconnect} />

      {isTransacting ? <LinearProgress /> : null}

      <TransactionModal
        modalOpen={modalOpen}
        handleModalClose={() => setModalOpen(false)}
        txHash={txHash}
      />

      <CustomError
        handleCloseError={handleCloseError}
        errorMessage={errorMessage}
        isError={isError}
      />

      {account ? (
        <div class="flex flex-col items-center mt-40 ">
          <div class="flex flex-row justify-start items-left w-1/2 -ml-20">
            <CustomButton
              mainColor={action === ACTION.SUPPLY ? 'blue-200' : 'white'}
              secondaryColor="black"
              hoverBgColor="blue-400"
              hoverTextColor="black"
              onClick={handleActionSupply}
              label={ACTION.SUPPLY}
            />
            <div class="ml-2"> </div>
            <CustomButton
              mainColor={action === ACTION.WITHDRAW ? 'blue-200' : 'white'}
              secondaryColor="black"
              hoverBgColor="blue-400"
              hoverTextColor="black"
              onClick={handleActionWithdraw}
              label={ACTION.WITHDRAW}
            />
          </div>

          <div class="mt-2 flex flex-row justify-around w-1/2">
            <CustomBox title="Your Supplied" value={`${round3decimal(mySupply)} ETH`} />
            <CustomBox title="Total Supplied" value={`${round3decimal(totalSupply)} ETH`} />
            <CustomBox title="APY" value={`${apy}%`} isLoading={apy === 0} />
          </div>

          <MainArea
            action={action}
            actionValue={actionValue}
            setActionValue={setActionValue}
            currency={currency}
            ethBalance={ethBalance}
            cEthBalance={cEthBalance}
            receiving={receiving}
            transacting={transacting}
          />
        </div>
      ) : (
        <HomepageSkeleton />
      )}
    </>
  );
};

export default Homepage;
