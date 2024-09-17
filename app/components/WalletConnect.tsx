import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';



function WalletConnectComponent(){
	const [userAccount, setUserAccount] = useState("");
	const [userAccountShort, setUserAccountShort] = useState("");
	const [balance, setBalance] = useState(0);

	const onConnect = () => {
		if (userAccount) {
		setUserAccount("");
		setUserAccountShort("");
		setBalance(0);
    	} else {
			if (window.ethereum) {
			  	window.ethereum
				  	.request({method: 'eth_requestAccounts'})
				  	.then((account) => {
				  		const fullAccount = account[0];
					setUserAccount(fullAccount);
					setUserAccountShort("0x" + "..." + fullAccount.slice(-4)); 
					getBalance(fullAccount);
				  		const [isVisible, setIsVisible] = useState(false);
				  	})
			} else {
				alert("Please install MetaMask!");
			}}
	};

	const getBalance = (account) => {
		window.ethereum.request({
			method: "eth_getBalance", 
			params: [account, "latest"],
		}).then((balance) => { 
			console.log(balance);
			setBalance(ethers.utils.formatEther(balance));
		}).catch((error) => {
				console.error("Error fetching balance:", error);
			});
		};


    return (
    	<div className='d-flex'>

            <div className='pt-4 pe-3 text_9 gray_dark' id='address'>
				{userAccount ? (
					<div className=''>
	                	<span сlassName=''>{userAccountShort} | Balance: {balance} ETH</span>
                	</div>
				) : (
                	<span сlassName=''>Wallet not connected</span>
               )}
           	</div>
            
            <div>
               <button 
                  id='show' 
                  className='we_300 btn_swap' 
                  onClick={onConnect}
               >
               {userAccount ? 'Disconnect' : 'Connect wallet'}
               </button>
            </div>
        </div>				
	);
}

export default WalletConnectComponent;