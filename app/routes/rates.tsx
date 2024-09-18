import React from 'react';
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import { searchTokens } from '../components/utils/api.js';
import { INCH_KEY } from './secrets'; 

const Rates = () => {
    return (
        <div className='wrap'>
            <Header />
            <div className='container py-4'>
                <h1>Rates</h1>
                <p>Rates of tokens by 1inch</p>

                <h2 className='we_800'>Here will be data which I get by API</h2>
            </div> 
            <Footer />
        </div> 
    );
};

export default Rates;