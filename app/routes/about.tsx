import React from 'react';
import Header from "../components/Header"; 
import Footer from "../components/Footer";


const About = () => {
    return (
        <div className='wrap'>
            <Header />
            <div className='container py-4'>
                <h1>About project</h1>

                <p>This is useful idea.</p>
            </div> 
            <Footer />
        </div> 
    );
};

export default About;