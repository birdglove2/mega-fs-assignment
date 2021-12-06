import { useEffect } from 'react';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../wallet/connectors';
import useError from './useError';

const useWeb3 = () => {
  const { handleError } = useError();
  const { account, activate, deactivate } = useWeb3React();

  const web3 = new Web3(Web3.givenProvider);

  useEffect(() => {
    connect();
  }, []);

  const connect = async () => {
    try {
      await activate(injected);
    } catch (err) {
      handleError(err);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
    } catch (err) {
      handleError(err);
    }
  };

  return { connect, disconnect, web3, account };
};

export default useWeb3;
