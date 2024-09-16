import React from 'react';
import ReactDOM from 'react-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import Header from "../components/Header"; 
import Footer from "../components/Footer";
import Bridge from '../components/Bridge';


function getLibrary(provider: any) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}


const Index = () => {
    return (
        <div className='wrap'>
            <Header />

            <div className='px-4'>
                <Web3ReactProvider getLibrary={getLibrary}>
                    <Bridge />      
                </Web3ReactProvider>
            </div> 
            
            <Footer />
        </div> 
    );
};

/*ReactDOM.render(<Index />, document.getElementById('root'));*/
export default Index;