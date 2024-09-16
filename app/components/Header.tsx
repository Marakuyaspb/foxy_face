import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from '@remix-run/react';

import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector'; // Import here
import WalletConnectComponent from './WalletConnect';


function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Header= () => {
   const { account, active, activate, deactivate } = useWeb3React();
   const [isVisible, setIsVisible] = useState(false);

   const showDiv = () => {
      setIsVisible(true);
   };
   const hideDiv = () => {
      setIsVisible(false);
   };

    const connectTheWallet = async () => {
       try {
         await activate(injected);
         hideDiv(); 
       } catch (error) {
         console.error("Failed to connect wallet:", error);
       }
     };


   return (
      <header>

         <div className="wrap">
            <div className="px-4 py-3 d-flex justify-content-between">

               <div className='pt-4'>
                  <Link to="/">
                     <h1 className="gray_dark we_600 logo_text">MadFox Bridge</h1>
                     <p className="gray_dark text_9 we_300">Smart way of token routing</p>
                  </Link>
               </div>

               <div className='d-flex' onClick={ showDiv }>

                     <div className='we_200 pt-4 pe-3 text_9 gray_dark' id='address'>
                     {active ? (
                        <span>{account}</span>
                     ) : (
                        <span сlassName=''>No wallet connected</span>
                     )}
                 </div>
                  <div>
                     <button 
                        id='show' 
                        className='we_300 btn_swap' 
                        onClick={active ? deactivate : connectTheWallet}
                     >
                     {active ? 'Disconnect' : 'Connect wallet'}
                     </button>
                  </div>


               </div>
            </div>
         </div>


         <div id='w' className={`modal_full ${isVisible ? 'block' : ''}`}>
            <div className='p-4 modal_container'>
               <span id='hide' className='close' onClick={hideDiv}>&times;</span>
               <center><h2 className='we_300'>Connect Your Wallet</h2></center>

                <Web3ReactProvider getLibrary={getLibrary}>
                  <WalletConnectComponent />
                </Web3ReactProvider>
                
            </div>
         </div>

      </header>
    );
};

export default Header;