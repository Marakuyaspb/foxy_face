import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from '@remix-run/react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import WalletConnectComponent from './WalletConnect';


function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const Header= () => {
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

               <div>
                  <Web3ReactProvider getLibrary={getLibrary}>
                     <WalletConnectComponent />
                  </Web3ReactProvider>
               </div>

            </div>
         </div>

      </header>
    );
};

export default Header;