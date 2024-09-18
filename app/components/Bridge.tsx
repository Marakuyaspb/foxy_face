import React, { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { INCH_KEY } from './secrets'; 

import chains from './utils/chains'; 
import tokens from './utils/tokens'; 




const Bridge: React.FC = () => {


  /* get info */
    const [selectedChain1, setSelectedChain1] = useState(chains[1]);
    const [selectedChain2, setSelectedChain2] = useState(chains[2]);
    const [selectedToken1, setSelectedToken1] = useState(tokens[0]);
    const [selectedToken2, setSelectedToken2] = useState(tokens[1]);

  /* replace top & bottom sections */
    const [isSwitched, setIsSwitched] = useState(false);
    const handleSwitch = () => { 
            setIsSwitched(prev => !prev);
        };

    
  /* get values */
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    
    /*
    const [tokenPrice, setTokenPrice] = useState<number | null>(null);
    const [calculatedValue, setCalculatedValue] = useState<number | null>(null);

    useEffect(() => {
        const fetchTokenPrice = async () => {
            try {
                const response = await fetch(`https://api.1inch.io/v4.0/1/quote?fromTokenSymbol=${selectedToken1.token}&toTokenSymbol=ETH&amount=1000000000000000000`, {
                    headers: {
                        'Authorization': `Bearer ${INCH_KEY}`
                    }
                });
                const data = await response.json();
                if (selectedToken1.token === 'ETH') {
                    setTokenPrice(data.toTokenAmount / 1e18); 
                } else if (selectedToken1.token === 'USDC') {
                    setTokenPrice(data.toTokenAmount / 1e6);
                } else if (selectedToken2.token === 'ETH') {
                    setTokenPrice(data.toTokenAmount / 1e18); 
                } else if (selectedToken2.token === 'USDC') {
                    setTokenPrice(data.toTokenAmount / 1e6);
                }
            } catch (error) {
                console.error("Error fetching token price:", error);
            }
        };

        fetchTokenPrice();
    }, [selectedToken1]);*/
        
    

     /* Handle input change */ 
    const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFromValue(event.target.value);
    };

    const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToValue(event.target.value);
    };

    const calculatedValueFrom = selectedToken1.tokenPrice * (parseFloat(fromValue) || 0);
    const calculatedValueTo = selectedToken2.tokenPrice * (parseFloat(toValue) || 0);


    return (
      <div className='bridge'>
        <h1 className="text-xl pt-2 pb-3">Bridge & Swap</h1>

        {isSwitched ? (
                <>

            <div className='variant_bg' id="from">

                {/* CHAIN 1 */}
                  <Listbox value={selectedChain1} onChange={setSelectedChain1}>
                    <Label className="block text-sm font-medium leading-6 text-gray-900">From</Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="svg-icon" 
                        dangerouslySetInnerHTML={{ __html: selectedChain1.avatar }} 
                      />
                          <span className="ml-3 block truncate">{selectedChain1.chain}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {chains.map((chain) => (
                          <ListboxOption
                            key={chain.id}
                            value={chain}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: chain.avatar }} />
                              <span className="ml-3 block truncate font-normal group-data-[selectedChain1]:font-semibold">
                                {chain.chain}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedChain1])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>
                

                {/* TOKEN 1*/}
                  <div className="row">
                    
                    <div className="col-sm-7">
                      <Listbox value={selectedToken1} onChange={setSelectedToken1}>
                        <div className="relative mt-2">
                          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="svg-icon" 
                            dangerouslySetInnerHTML={{ __html: selectedToken1.avatar }} 
                          />
                              <span className="ml-3 block truncate">{selectedToken1.token}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {tokens.map((token) => (
                              <ListboxOption
                                key={token.id}
                                value={token}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="svg-icon" dangerouslySetInnerHTML={{ __html: token.avatar }} />
                                  <span className="ml-3 block truncate font-normal group-data-[selectedToken1]:font-semibold">
                                    {token.token}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedToken1])_&]:hidden">
                                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>

                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          {selectedToken1 ? `~ ∞ ${selectedToken1.token}` : "Select a token"}
                        </label>
                      </Listbox>
                    </div>

                    <div className="col-sm-5">
                      <div className="relative mt-2 rounded-md">
                          <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
                          </div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block w-full rounded-md how_much ps-2  text-gray-900 placeholder:text-gray-500 "
                            value={fromValue}
                            onChange={handleFromChange}
                          />
                      </div>

                      <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          $ {calculatedValueFrom.toFixed(2)}
                      </label>

                    </div>
                  </div>
            </div>

            {/* THE REPLACE ARROWS */}
            <div className="">
              <img src="/svg_icons/change.svg" alt="Change Icon" className="w-8 h-8 change_icon" onClick={handleSwitch} />
            </div>


            <div className='variant_bg' id="to">

                {/* CHAIN 2*/}
                  <Listbox value={selectedChain2} onChange={setSelectedChain2}>
                   <Label className="block text-sm font-medium leading-6 text-gray-900">To</Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="svg-icon" 
                        dangerouslySetInnerHTML={{ __html: selectedChain2.avatar }} 
                      />
                          <span className="ml-3 block truncate">{selectedChain2.chain}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {chains.map((chain) => (
                          <ListboxOption
                            key={chain.id}
                            value={chain}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: chain.avatar }} />
                              <span className="ml-3 block truncate font-normal group-data-[selectedChain2]:font-semibold">
                                {chain.chain}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedChain2])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                  </Listbox>


                {/* TOKEN 2 */}
                  <div className="row">
                    <div className="col-sm-7">
                      <Listbox value={selectedToken2} onChange={setSelectedToken2}>
                        <div className="relative mt-2">
                          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="svg-icon" 
                            dangerouslySetInnerHTML={{ __html: selectedToken2.avatar }} 
                          />
                              <span className="ml-3 block truncate">{selectedToken2.token}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {tokens.map((token) => (
                              <ListboxOption
                                key={token.id}
                                value={token}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: token.avatar }} />
                                  <span className="ml-3 block truncate font-normal group-data-[selectedToken2]:font-semibold">
                                    {token.token}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedToken2])_&]:hidden">
                                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>

                        </div>
                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                           {selectedToken1 ? `~ ∞ ${selectedToken1.token}` : "Select a token"}
                        </label>
                      </Listbox>
                    </div>

                    <div className="col-sm-5">
                        
                      <div className="relative mt-2 rounded-md">
                          <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">

                          </div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block w-full rounded-md how_much ps-2  text-gray-900 placeholder:text-gray-500 "
                            value={toValue}
                            onChange={handleToChange}
                          />
                      
                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          $ {calculatedValueTo.toFixed(2)}
                        </label>
                      </div>
                    </div>
                  </div>

            </div>
            </> 

            ) : (
            <>


            <div className='variant_bg' id="to">

                {/* CHAIN 2*/}
                <Listbox value={selectedChain2} onChange={setSelectedChain2}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900">From</Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="svg-icon" 
                        dangerouslySetInnerHTML={{ __html: selectedChain2.avatar }} 
                      />
                          <span className="ml-3 block truncate">{selectedChain2.chain}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {chains.map((chain) => (
                          <ListboxOption
                            key={chain.id}
                            value={chain}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: chain.avatar }} />
                              <span className="ml-3 block truncate font-normal group-data-[selectedChain2]:font-semibold">
                                {chain.chain}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedChain2])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                </Listbox>


                {/* TOKEN 2 */}
                <div className="row">
                    <div className="col-sm-7">
                      <Listbox value={selectedToken2} onChange={setSelectedToken2}>
                        <div className="relative mt-2">
                          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="svg-icon" 
                            dangerouslySetInnerHTML={{ __html: selectedToken2.avatar }} 
                          />
                              <span className="ml-3 block truncate">{selectedToken2.token}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {tokens.map((token) => (
                              <ListboxOption
                                key={token.id}
                                value={token}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: token.avatar }} />
                                  <span className="ml-3 block truncate font-normal group-data-[selectedToken2]:font-semibold">
                                    {token.token}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedToken2])_&]:hidden">
                                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>

                        </div>

                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          {selectedToken2 ? `~ ∞ ${selectedToken2.token}` : "Select a token"}
                        </label>
                      </Listbox>
                    </div>
                    <div className="col-sm-5">    
                      <div className="relative mt-2 rounded-md">
                        <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
                        </div>
                        <input
                          id="price"
                          name="price"
                          type="text"
                          placeholder="0.00"
                          className="block w-full rounded-md how_much ps-2  text-gray-900 placeholder:text-gray-500 "
                          value={toValue}
                            onChange={handleToChange}
                        />
                      </div>
                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          $ {calculatedValueTo.toFixed(2)}
                        </label>
                    </div>
                  </div>
            </div>

            {/* THE REPLACE ARROWS */}
            <div className="">
              <img src="/svg_icons/change.svg" alt="Change Icon" className="w-8 h-8 change_icon" onClick={handleSwitch} />
            </div>

            <div className='variant_bg' id="from">

                {/* CHAIN 1 */}
                <Listbox value={selectedChain1} onChange={setSelectedChain1}>
                  <Label className="block text-sm font-medium leading-6 text-gray-900">To</Label>
                    <div className="relative mt-2">
                      <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="svg-icon" 
                        dangerouslySetInnerHTML={{ __html: selectedChain1.avatar }} 
                      />
                          <span className="ml-3 block truncate">{selectedChain1.chain}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                      </ListboxButton>

                      <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                      >
                        {chains.map((chain) => (
                          <ListboxOption
                            key={chain.id}
                            value={chain}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                          >
                            <div className="flex items-center">
                              <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: chain.avatar }} />
                              <span className="ml-3 block truncate font-normal group-data-[selectedChain1]:font-semibold">
                                {chain.chain}
                              </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedChain1])_&]:hidden">
                              <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </div>
                </Listbox>
                

                {/* TOKEN 1*/}
                <div className="row">
                    <div className="col-sm-7">
                      <Listbox value={selectedToken1} onChange={setSelectedToken1}>
                        <div className="relative mt-2">
                          <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                            <span className="flex items-center">
                              <span className="svg-icon" 
                            dangerouslySetInnerHTML={{ __html: selectedToken1.avatar }} 
                          />
                              <span className="ml-3 block truncate">{selectedToken1.token}</span>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                              <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                            </span>
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                          >
                            {tokens.map((token) => (
                              <ListboxOption
                                key={token.id}
                                value={token}
                                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                              >
                                <div className="flex items-center">
                                  <span className="svg-icon"        dangerouslySetInnerHTML={{ __html: token.avatar }} />
                                  <span className="ml-3 block truncate font-normal group-data-[selectedToken1]:font-semibold">
                                    {token.token}
                                  </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selectedToken1])_&]:hidden">
                                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>

                        <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          {selectedToken1 ? `~ ∞ ${selectedToken1.token}` : "Select a token"}
                        </label>
                      </Listbox>
                    </div>
                    <div className="col-sm-5">   
                      <div className="relative mt-2 rounded-md">
                          <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3">
                          </div>
                          <input
                            id="price"
                            name="price"
                            type="text"
                            placeholder="0.00"
                            className="block w-full rounded-md how_much ps-2  text-gray-900 placeholder:text-gray-500 "
                            value={fromValue}
                            onChange={handleFromChange}
                          />
                      </div>
                      <label htmlFor="price" className="we_200 block text-sm font-medium text-gray-900">
                          $ {calculatedValueFrom.toFixed(2)}
                      </label>
                    </div>
                </div>

            </div>

            </>
        )}  

        <center>
          <button className='button_light'>Swap it</button>
        </center>

      </div>
    );
};
export default Bridge;