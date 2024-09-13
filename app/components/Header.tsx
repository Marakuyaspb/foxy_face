import React, { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';



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
            <div className="p-4 d-flex justify-content-between">

               <div>
                  <h1 className="text-3xl">MadFox Bridge</h1>
                  <p className="pb-4">Smart way of token routing</p>
               </div>

               <div>
                  <button id='show' className='btn_swap' onClick={showDiv}>Connect wallet</button>
               </div>
            </div>
         </div>


         <div id='w' className={`modal_full ${isVisible ? 'block' : ''}`}>
            <div className='p-4 modal_container'>
               <span id='hide' class='close' onClick={hideDiv}>&times;</span>
               <h2>Connect Your Wallet</h2>
            </div>
         </div>

      </header>
    );
};

export default Header;