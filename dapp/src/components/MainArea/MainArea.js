import { Box } from '@mui/material';
import { CustomButton } from '../ui-components';
import { CURRENCY } from '../../utils';

const MainArea = ({
  action,
  actionValue,
  setActionValue,
  currency,
  ethBalance,
  cEthBalance,
  receiving,
  transacting,
}) => {
  return (
    <Box class="w-96 h-80 mt-4 flex flex-col justify-around items-center border-2 border-black rounded">
      <h1 class="font-semibold text-xl">{action}</h1>

      <div class="p-2 flex flex-col">
        <div class="mb-1 text-right text-gray-400 text-xs">
          Balance{' '}
          {currency === CURRENCY.ETH
            ? ethBalance + ` ${CURRENCY.ETH}`
            : cEthBalance + ` ${CURRENCY.cETH}`}
        </div>
        <div class="w-full flex flex-row justify-start">
          <div class="p-2 pr-6 mr-1  mw-full flex flex-row border border-black">
            {currency === CURRENCY.ETH ? CURRENCY.ETH : CURRENCY.cETH}
          </div>

          <div class="p-2 ml-1 w-full flex flex-row justify-around border border-black">
            <div
              class="cursor-pointer text-center text-blue-400 hover:text-green-400"
              onClick={() => setActionValue(currency === CURRENCY.ETH ? ethBalance : cEthBalance)}
            >
              MAX
            </div>

            <input
              class="text-right border-0 justify-center 
                   focus:outline-none"
              type="number"
              min="0"
              onChange={(e) => setActionValue(e.target.value)}
              value={`${actionValue}`}
              placeholder={`0 ${currency}`}
            />
          </div>
        </div>
        <div class="mt-2 flex flex-row justify-between w-full text-right text-gray-400 text-xs">
          <div>Receiving</div>
          <div>
            {receiving} {currency === CURRENCY.ETH ? CURRENCY.cETH : CURRENCY.ETH}
          </div>
        </div>
      </div>

      <CustomButton
        mainColor="black"
        secondaryColor="white"
        hoverBgColor="blue-200"
        onClick={transacting}
        label={action}
        width={60}
      />
    </Box>
  );
};

export default MainArea;
