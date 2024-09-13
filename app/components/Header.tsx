import React from 'react';
import Nav from "../components/Nav";

const Header: React.FC = () => {
    return (

        <header>
           <div className="">
              <div class="p-4 d-flex justify-content-between">
                 <div>
                     <h1 className="text-3xl">MadFox Bridge</h1>
                     <p className="pb-4">Smart way of token routing</p>

                  </div>
                  <div>
                     <button className='btn_swap'>Connect wallet</button>
                  </div>
               </div>
            </div>
        </header>
    );
};

export default Header;