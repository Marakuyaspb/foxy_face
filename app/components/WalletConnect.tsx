import React, { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';


const WalletConnect: React.FC = () => {
	return (
	<div className='w_container pt-5'>
		
		<div className='card'>
			<img src="/svg_icons/wallets/metamask.svg" alt="Wallet Icon" className=" "  />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/w_connect.svg" alt="Wallet Icon" className=""  />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/trust.svg" alt="Wallet Icon" className=" "  />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/coinbase.svg" alt="Wallet Icon" className=" " />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/okx.svg" alt="Wallet Icon" className="" />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/imtoken.svg" alt="Wallet Icon" className=" "  />
		</div>
		<div className='card'>
			<img src="/svg_icons/wallets/rainbow.svg" alt="Wallet Icon" className=" "  />
		</div>
		
	</div>
	);
};

export default WalletConnect;