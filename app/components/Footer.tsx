import React from 'react';
import { Link } from '@remix-run/react';

const Footer: React.FC = () => {
    return (
        <footer className='fixed-bottom'>
            <div class="d-flex justify-content-center">
                <Link className='p-3 we_300 orange_light' to="/">Bridge</Link>
                <Link className='p-3 we_300 orange_light' to="/roadmap">Roadmap</Link>
                <Link className='p-3 we_300 orange_light' to="/about">About</Link>
                </div>

            <div className='p-4'>
                <p className="we_200 text_8">© 2024, MadFox. All rights reserved.</p>
            </div>
        </footer>
    );
};
export default Footer;