import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { ethers } from 'ethers';

import { INFURA_RPC_URL } from './secrets'; 

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const walletConnect = new WalletConnectConnector({
	rpc: { 1: INFURA_RPC_URL },
	qrcode: true,
});


const WalletConnectComponent: React.FC = () => {
	const { activate, active, account } = useWeb3React();

	const connectInjected = async () => {
		if (!window.ethereum) {
		  alert("Please install MetaMask!");
		  return;
		}

		try {
			await activate(injected);
		} catch (error) {
			console.error("Failed to connect with MetaMask:", error);
		}
	};

	const connectWalletConnect = async () => {
		try {
			await activate(walletConnect);
		} catch (error) {
			console.error("Failed to connect with WalletConnect:", error);
		}
	};


    return (
		<div className='w_container pt-5'>
			
			<div id='metamask' className='card' onClick={connectInjected}>
				<img src="/svg_icons/wallets/metamask.svg" alt="Wallet Icon" className=" "  />
			</div>
			<div className='card' onClick={connectWalletConnect}>
				<img src="/svg_icons/wallets/w_connect.svg" alt="Wallet Icon" className=""  />
			</div>
			<div className='card'>
				<img src="/svg_icons/wallets/trust.svg" alt="Wallet Icon" className="op_50"  />
			</div>
			<div className='card'>
				<img src="/svg_icons/wallets/coinbase.svg" alt="Wallet Icon" className="op_50" />
			</div>
			<div className='card'>
				<img src="/svg_icons/wallets/okx.svg" alt="Wallet Icon" className="op_50" />
			</div>
			<div className='card'>
				<img src="/svg_icons/wallets/imtoken.svg" alt="Wallet Icon" className="op_50"  />
			</div>
			<div className='card'>
				<img src="/svg_icons/wallets/rainbow.svg" alt="Wallet Icon" className="op_50"  />
			</div>
			{active && <div>Connected as: {account}</div>}
		</div>
	);
};

export default WalletConnectComponent;