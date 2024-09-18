import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';



function WalletConnectComponent(){
	const [userAccount, setUserAccount] = useState("");
	const [userAccountShort, setUserAccountShort] = useState("");
	const [balance, setBalance] = useState(0);
	const [isVisible, setIsVisible] = useState(false);

	const onConnect = async () => {
		if (userAccount) {
		setUserAccount("");
		setUserAccountShort("");
		setBalance(0);
    	} else {
			if (window.ethereum) {
				try {
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const fullAccount = accounts[0];
					setUserAccount(fullAccount);
					setUserAccountShort("0x" + "..." + fullAccount.slice(-4)); 
					getBalance(fullAccount);
					hideModal();
				} catch (error) {
					console.error("Error connecting:", error);
				}
			} else {
				alert("Please install MetaMask!");
			}
		}
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

	/* About modal window */
	const showModal = () => {
		setIsVisible(true);
	};
	const hideModal = () => {
		setIsVisible(false);
	};


    return (
    	<div>
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
               <button id='show' 
                  className={userAccount ? 'hide button_light' : 'block button_light we_300'  }
                  onClick={showModal}
               >
               {userAccount ? 'Disconnect' : 'Connect wallet'}
               </button>

               <button id='disconnect' 
                  className={ userAccount ? 'block button_light' : 'hide button_light we_300' }  
                  onClick={onConnect}
               >
               {userAccount ? 'Disconnect' : 'Connect wallet'}
               </button>
            </div>
        	</div>

        	<div className={`${isVisible ? 'block' : 'hidden'} modal_full`} id="w">
			
	            <div className='p-4 modal_container'>
	               <span id='hide' className='close' onClick={hideModal}>&times;</span>
	               <center><h2 className='we_300'>Connect Your Wallet</h2></center>

		            <div className='w_container pt-5'> 
		               <div id='metamask' className='card' onClick={onConnect}>
		                  <img src="/svg_icons/wallets/metamask.svg" alt="Wallet Icon" className=" "  />
		               </div>
		               <div className='card'>
								<img src="/svg_icons/wallets/w_connect.svg" alt="Wallet Icon" className="op_50"  />
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
		           	</div>
	         	</div>
	         	
      	</div>

		</div>
	);
}

export default WalletConnectComponent;