import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from '@remix-run/react';

import { Web3ReactProvider } from '@web3-react/core';
import WalletConnectComponent from './WalletConnect';
import { ethers } from 'ethers';

function getLibrary(provider: any) {
  return new ethers.providers.Web3Provider(provider);
}

const Header= () => {
   const [isVisible, setIsVisible] = useState(false);
   const showDiv = () => {
      setIsVisible(true);
   };
   const hideDiv = () => {
      setIsVisible(false);
   };


   return (
      <header>

         <div className="wrap">
            <div className="px-4 py-3 d-flex justify-content-between">

               <div className=''>
                  <Link to="/">
                     <h1 className="gray_dark we_600 logo_text">MadFox Bridge</h1>
                     <p className="gray_dark text_9 we_300">Smart way of token routing</p>
                  </Link>
               </div>

               <div>
                  <button id='show' className='we_300 btn_swap' onClick={showDiv}>Connect wallet</button>
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