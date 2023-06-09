/* eslint-disable */
import React, { useState } from 'react';
import { Web3Context } from './index';
import Web3 from 'web3';
import Web3Football from "../contracts/Web3Football.json"

const Web3Provider = ({ children }) => {
  

  const [account, setAccount] = useState({
    accounts: null,
    currentAccount: null,
  });


  const [Contract, setContract] = useState('');

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');
        return;
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      // console.log('Connected', accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      return;
    } else {
      // console.log('We have the ethereum object');
    }
    var web3 = new Web3(window.ethereum);

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const chain = await web3.eth.getChainId();
    setAccount({
      accounts: accounts,
      currentAccount: accounts[0],
    });

    if (accounts.length !== 0) {
      getContract(chain, accounts);
      return true;
    } else {
      console.log('No authorized account found');
      return false;
    }
  };
  const getContract = (chain, accounts) => {
    var web3 = new Web3(window.ethereum);

    const deployedNetwork = Web3Football.networks[chain];

    const instance = new web3.eth.Contract(
      Web3Football.abi,
      deployedNetwork && deployedNetwork.address
    );

    setContract(instance);
  };



  return (
    <Web3Context.Provider
      value={{
        connectWallet,
        checkIfWalletIsConnected,
        account,
        Contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;