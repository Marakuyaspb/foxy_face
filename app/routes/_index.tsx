import React from 'react';
import ReactDOM from 'react-dom';
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import Bridge from '../components/Bridge';


const Index = () => {
    return (
            <div className='wrap'>
            <Header />

            <div className='p-4'>
                <Bridge />      
            </div> 
            
            <Footer />
            </div> 
    );
};

export default Index;