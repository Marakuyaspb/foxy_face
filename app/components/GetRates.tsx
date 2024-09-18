import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';


import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
  
import { INFURA_RPC_URL } from './secrets'; 
import { searchTokens } from './utils/api.js';

const injected = new InjectedConnector({
   supportedChainIds: [1, 2, 3] 
});
const walletConnect = new WalletConnectConnector({
   rpc: { 1: INFURA_RPC_URL },
   qrcode: true,
});


function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}



function GetRatesComponent(){
	const [userAccount, setUserAccount] = useState("");
	const [userAccountShort, setUserAccountShort] = useState("");
	const [balance, setBalance] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	
}

export default GetRates;