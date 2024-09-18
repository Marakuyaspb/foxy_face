import React, { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { INCH_KEY } from './secrets'; 
import { searchTokens } from 'utils/api.js';


const chains =[
  {
    id: 1,
    chain: 'Ethereum',
    avatar: '<svg   width="25.999998"   height="25.999998"   fill="none"   viewBox="0 0 25.999998 25.999998"><path     d="M 13,25.999999 C 20.179249,25.999999 25.999999,20.179249 25.999999,13 25.999999,5.8207498 20.179249,0 13,0 5.8207498,0 0,5.8207498 0,13 0,20.179249 5.8207498,25.999999 13,25.999999 Z"fill="#627eea"id="path1"style="stroke-width:1" /><path d="m 13.404083,3.2499999 v 7.2063331 l 6.091583,2.722417 -6.0905,-9.9287501 z" fill="#ffffff" fill-opacity="0.602" id="path2" style="stroke-width:1" /><path d="M 13.404083,3.2499999 7.3124998,13.17875 13.404083,10.457416 Z" fill="#ffffff" id="path3" style="stroke-width:1" />  <path d="m 13.404083,17.848999 v 4.896667 L 19.499999,14.313 Z" fill="#ffffff" fill-opacity="0.602" id="path4" style="stroke-width:1" /> <path d="M 13.404083,22.745666 V 17.848999 L 7.3124998,14.311916 13.404083,22.744583 Z" fill="#ffffff" id="path5" style="stroke-width:1" /><path d="m 13.404083,16.715833 6.091583,-3.537083 -6.0905,-2.72025 v 6.257333 z" fill="#ffffff" fill-opacity="0.2" id="path6" style="stroke-width:1" /><path d="m 7.3124998,13.17875 6.0915832,3.537083 V 10.4585 Z" fill="#ffffff" fill-opacity="0.602" id="path7" style="stroke-width:1" /></svg>',
  },
  {
    id: 2,
    chain: 'zkSynk Era',
    avatar: '<svg  width="26"  height="26"  viewBox="0 0 26 26" fill="none"  filter="invert(0)"> <circle  style="fill:#ffffff;stroke-width:3.77953;stroke-linecap:round;stroke-linejoin:round"  id="path3" cx="13" cy="13" r="13" /> <g id="g2" transform="matrix(1.8571429,0,0,1.8571429,0,5.7199998)" style="stroke-width:0.538462"> <path fill-rule="evenodd" clip-rule="evenodd" d="M 14,3.92 10.066,0 V 2.87085 L 6.15997,5.74518 10.066,5.74789 V 7.84 Z" fill="#000000" id="path1" style="stroke-width:0.289941" /><path fill-rule="evenodd" clip-rule="evenodd" d="M 0,3.92 3.93396,7.84 V 4.99224 L 7.84,2.09479 3.93396,2.09211 V 0 Z" fill="#000000" id="path2" style="stroke-width:0.289941" /></g></svg>',
  },
  {
    id: 3,
    chain: 'Arbitrum',
    avatar: '<svg  width="26"  height="29.190681"  viewBox="0 0 26 29.190679"  version="1.1"><g  id="symbol"  transform="matrix(0.20802163,0,0,0.20802163,-36.920927,-11.065524)"  style="stroke-width:4.80719"> <path id="Path_153" data-name="Path 153" d="m 266.978,128.665 10.305,-17.485 27.776,43.262 0.013,8.3 -0.091,-57.131 a 4.3,4.3 0 0 0 -1.99,-3.428 L 252.984,73.42 a 4.408,4.408 0 0 0 -3.821,0.018 4.352,4.352 0 0 0 -0.448,0.259 l -0.174,0.11 -48.541,28.128 -0.189,0.085 a 4.417,4.417 0 0 0 -0.717,0.418 4.29,4.29 0 0 0 -1.729,2.731 4.419,4.419 0 0 0 -0.062,0.505 l 0.076,46.556 25.872,-40.1 c 3.257,-5.317 10.354,-7.03 16.942,-6.937 l 7.732,0.2 -45.56,73.064 5.371,3.092 46.106,-76.083 20.379,-0.074 -45.987,78 19.166,11.03 2.29,1.317 a 4.4,4.4 0 0 0 3.087,0.061 l 50.71,-29.387 -9.7,5.618 z m 3.932,56.627 -19.356,-30.379 11.815,-20.049 25.42,40.066 z" transform="translate(-11.186,-11.178)" fill="#2d374b" style="stroke-width:4.80719" /> <path id="Path_154" data-name="Path 154" d="M 321.883,235.122 341.239,265.5 359.119,255.138 333.7,215.073 Z" transform="translate(-81.515,-91.387)"  fill="#28a0f0" style="stroke-width:4.80719" /> <path id="Path_155" data-name="Path 155" d="m 395.4,212.248 -0.013,-8.3 -27.776,-43.262 -10.311,17.483 26.814,43.366 9.7,-5.618 a 4.3,4.3 0 0 0 1.587,-3.129 z" transform="translate(-101.511,-60.683)" fill="#28a0f0" style="stroke-width:4.80719" /><path id="Path_156" data-name="Path 156" d="m 177.491,212.312 13.691,7.889 45.56,-73.064 -7.732,-0.2 c -6.588,-0.093 -13.685,1.619 -16.942,6.937 l -25.872,40.1 -8.7,13.373 v 4.969 z" transform="translate(0,-52.917)" fill="#ffffff" style="stroke-width:25.1071" /><path id="Path_157" data-name="Path 157" d="m 287.75,147.406 -20.378,0.074 -46.106,76.083 16.115,9.279 4.382,-7.433 z" transform="translate(-24.713,-53.187)"  fill="#ffffff" style="stroke-width:25.1071" /><path id="Path_158" data-name="Path 158" d="M 302.474,94.114 A 12.98,12.98 0 0 0 296.381,83.679 L 245.719,54.545 a 13.178,13.178 0 0 0 -11.624,0 c -0.423,0.213 -49.268,28.542 -49.268,28.542 a 13.016,13.016 0 0 0 -1.94,1.148 12.881,12.881 0 0 0 -5.4,9.854 v 60.338 l 8.7,-13.373 L 186.12,94.5 a 4.325,4.325 0 0 1 1.791,-3.236 c 0.23,-0.165 49.909,-28.921 50.067,-29 a 4.408,4.408 0 0 1 3.821,-0.018 l 50.007,28.765 a 4.3,4.3 0 0 1 1.99,3.428 v 57.672 a 4.2,4.2 0 0 1 -1.495,3.129 l -9.7,5.618 -5,2.9 -17.88,10.362 -18.133,10.509 a 4.395,4.395 0 0 1 -3.087,-0.061 l -21.453,-12.339 -4.382,7.432 19.28,11.1 c 0.638,0.362 1.206,0.684 1.672,0.946 0.722,0.4 1.214,0.675 1.387,0.759 a 12.528,12.528 0 0 0 5.118,1.053 12.89,12.89 0 0 0 4.72,-0.888 l 52.667,-30.5 a 12.876,12.876 0 0 0 4.962,-9.7 z" transform="translate(-0.001)" fill="#96bedc" style="stroke-width:4.80719" /></g></svg>',
  },
]

const tokens =[
  {
    id: 1,
    token: 'ETH',
    avatar: '<svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z" fill="#627EEA"></path><path d="M12.373 3v6.652l5.623 2.513L12.374 3Z" fill="#fff" fill-opacity="0.602"></path><path d="M12.373 3 6.75 12.165l5.623-2.512V3Z" fill="#fff"></path><path d="M12.373 16.476v4.52L18 13.212l-5.627 3.264Z" fill="#fff" fill-opacity="0.602"></path><path d="M12.373 20.996v-4.52L6.75 13.211l5.623 7.784Z" fill="#fff"></path><path d="m12.373 15.43 5.623-3.265-5.622-2.511v5.776Z" fill="#fff" fill-opacity="0.2"></path><path d="m6.75 12.165 5.623 3.265V9.654L6.75 12.165Z" fill="#fff" fill-opacity="0.602"></path></svg>',
    tokenPrice: 3000
  },
  {
    id: 2,
    token: 'USDC',
    avatar: '<svg width="26" height="26" fill="none" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M12 24c6.65 0 12-5.35 12-12S18.65 0 12 0 0 5.35 0 12s5.35 12 12 12Z" fill="#2775CA"></path><path d="M15.3 13.9c0-1.75-1.05-2.35-3.15-2.6-1.5-.2-1.8-.6-1.8-1.3 0-.7.5-1.15 1.5-1.15.9 0 1.4.3 1.65 1.05.05.15.2.25.35.25h.8c.2 0 .35-.15.35-.35v-.05c-.2-1.1-1.1-1.95-2.25-2.05V6.5c0-.2-.15-.35-.4-.4h-.75c-.2 0-.35.15-.4.4v1.15c-1.5.2-2.45 1.2-2.45 2.45 0 1.65 1 2.3 3.1 2.55 1.4.25 1.85.55 1.85 1.35s-.7 1.35-1.65 1.35c-1.3 0-1.75-.55-1.9-1.3-.05-.2-.2-.3-.35-.3h-.85c-.2 0-.35.15-.35.35v.05c.2 1.25 1 2.15 2.65 2.4v1.2c0 .2.15.35.4.4h.75c.2 0 .35-.15.4-.4v-1.2c1.5-.25 2.5-1.3 2.5-2.65Z" fill="#fff"></path><path d="M9.45 19.15c-3.9-1.4-5.9-5.75-4.45-9.6.75-2.1 2.4-3.7 4.45-4.45.2-.1.3-.25.3-.5v-.7c0-.2-.1-.35-.3-.4-.05 0-.15 0-.2.05C4.5 5.05 1.9 10.1 3.4 14.85c.9 2.8 3.05 4.95 5.85 5.85.2.1.4 0 .45-.2.05-.05.05-.1.05-.2v-.7c0-.15-.15-.35-.3-.45Zm5.3-15.6c-.2-.1-.4 0-.45.2-.05.05-.05.1-.05.2v.7c0 .2.15.4.3.5 3.9 1.4 5.9 5.75 4.45 9.6-.75 2.1-2.4 3.7-4.45 4.45-.2.1-.3.25-.3.5v.7c0 .2.1.35.3.4.05 0 .15 0 .2-.05 4.75-1.5 7.35-6.55 5.85-11.3-.9-2.85-3.1-5-5.85-5.9Z" fill="#fff"></path></svg>',
    tokenPrice: 0.98
  },
/*  {
    id: 3,
    token: 'ARB',
    avatar: '<svg  width="26"  height="29.190681"  viewBox="0 0 26 29.190679"  version="1.1"><g  id="symbol"  transform="matrix(0.20802163,0,0,0.20802163,-36.920927,-11.065524)"  style="stroke-width:4.80719"> <path id="Path_153" data-name="Path 153" d="m 266.978,128.665 10.305,-17.485 27.776,43.262 0.013,8.3 -0.091,-57.131 a 4.3,4.3 0 0 0 -1.99,-3.428 L 252.984,73.42 a 4.408,4.408 0 0 0 -3.821,0.018 4.352,4.352 0 0 0 -0.448,0.259 l -0.174,0.11 -48.541,28.128 -0.189,0.085 a 4.417,4.417 0 0 0 -0.717,0.418 4.29,4.29 0 0 0 -1.729,2.731 4.419,4.419 0 0 0 -0.062,0.505 l 0.076,46.556 25.872,-40.1 c 3.257,-5.317 10.354,-7.03 16.942,-6.937 l 7.732,0.2 -45.56,73.064 5.371,3.092 46.106,-76.083 20.379,-0.074 -45.987,78 19.166,11.03 2.29,1.317 a 4.4,4.4 0 0 0 3.087,0.061 l 50.71,-29.387 -9.7,5.618 z m 3.932,56.627 -19.356,-30.379 11.815,-20.049 25.42,40.066 z" transform="translate(-11.186,-11.178)" fill="#2d374b" style="stroke-width:4.80719" /> <path id="Path_154" data-name="Path 154" d="M 321.883,235.122 341.239,265.5 359.119,255.138 333.7,215.073 Z" transform="translate(-81.515,-91.387)"  fill="#28a0f0" style="stroke-width:4.80719" /> <path id="Path_155" data-name="Path 155" d="m 395.4,212.248 -0.013,-8.3 -27.776,-43.262 -10.311,17.483 26.814,43.366 9.7,-5.618 a 4.3,4.3 0 0 0 1.587,-3.129 z" transform="translate(-101.511,-60.683)" fill="#28a0f0" style="stroke-width:4.80719" /><path id="Path_156" data-name="Path 156" d="m 177.491,212.312 13.691,7.889 45.56,-73.064 -7.732,-0.2 c -6.588,-0.093 -13.685,1.619 -16.942,6.937 l -25.872,40.1 -8.7,13.373 v 4.969 z" transform="translate(0,-52.917)" fill="#ffffff" style="stroke-width:25.1071" /><path id="Path_157" data-name="Path 157" d="m 287.75,147.406 -20.378,0.074 -46.106,76.083 16.115,9.279 4.382,-7.433 z" transform="translate(-24.713,-53.187)"  fill="#ffffff" style="stroke-width:25.1071" /><path id="Path_158" data-name="Path 158" d="M 302.474,94.114 A 12.98,12.98 0 0 0 296.381,83.679 L 245.719,54.545 a 13.178,13.178 0 0 0 -11.624,0 c -0.423,0.213 -49.268,28.542 -49.268,28.542 a 13.016,13.016 0 0 0 -1.94,1.148 12.881,12.881 0 0 0 -5.4,9.854 v 60.338 l 8.7,-13.373 L 186.12,94.5 a 4.325,4.325 0 0 1 1.791,-3.236 c 0.23,-0.165 49.909,-28.921 50.067,-29 a 4.408,4.408 0 0 1 3.821,-0.018 l 50.007,28.765 a 4.3,4.3 0 0 1 1.99,3.428 v 57.672 a 4.2,4.2 0 0 1 -1.495,3.129 l -9.7,5.618 -5,2.9 -17.88,10.362 -18.133,10.509 a 4.395,4.395 0 0 1 -3.087,-0.061 l -21.453,-12.339 -4.382,7.432 19.28,11.1 c 0.638,0.362 1.206,0.684 1.672,0.946 0.722,0.4 1.214,0.675 1.387,0.759 a 12.528,12.528 0 0 0 5.118,1.053 12.89,12.89 0 0 0 4.72,-0.888 l 52.667,-30.5 a 12.876,12.876 0 0 0 4.962,-9.7 z" transform="translate(-0.001)" fill="#96bedc" style="stroke-width:4.80719" /></g></svg>',
    tokenPrice: 300
  }*/
]


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




    /*    
    const [fromValue, setfromValue] = useState('');
        const handleFromChange = (event) => {
          setfromValue(event.target.value);
        };
    const [toValue, settoValue] = useState('');
        const handleToChange = (event) => {
          settoValue(event.target.value);
        };
    */





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
                           $ {calculatedValueTo.toFixed(2)}
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