import React from 'react';

const Nav: React.FC = () => {
    return (
        <div>
            <p className="pb-4">Orders</p>
            <p className="pb-4">Stat</p>
            <p className="pb-4">About</p>
            <button>Connect wallet</button>
        </div>
    );
};

export default Nav;