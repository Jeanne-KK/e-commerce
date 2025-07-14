import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import logo from '../assets/name.png';
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';


function Header() {
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    return (
        <nav>
            <div className='font-roboto grid grid-cols-2 justify-between bg-white'>
                <div className='flex pl-5 md:pl-10 py-5 items-center'>
                    <a className='text-2xl' href='#home'><img src={logo} alt="icon" className="w-32 h-auto rounded" /></a>
                </div>
                <div className='flex w-auto justify-end pr-5 md:pr-10 py-5 items-center'>
                    <div className='flex gap-x-5 lg:gap-x-10 whitespace-nowrap items-center'>
                        <div className='hidden md:flex border max-w-sm rounded-3xl w-full border-gray-500 focus:border-blue-500 p-2 focus-within:ring-2 focus-within:ring-blue-500'>
                            <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                            <input type='text' className='focus:outline-none pl-3 w-full' />
                        </div>
                        <button onClick={() => setMobileSearchOpen(!isMobileSearchOpen)} className='flex md:hidden cursor-pointer'><MagnifyingGlassIcon className='size-6' /></button>

                        <div className='md:relative'>
                            <button onClick={() => setCartOpen(!isCartOpen)} className='flex cursor-pointer'><ShoppingCartIcon className='size-6 flex' /></button>
                            {isCartOpen &&
                            <>
                            <div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden' onClick={() => setCartOpen(false)}></div>
                            <div className='absolute right-0 top-5 md:top-auto w-full md:w-100 p-5 bg-white border border-gray-200 rounded-md shadow-lg z-50 items-center '>
                                    <button onClick={() => setCartOpen(!isCartOpen)} className='absolute right-1 top-1 cursor-pointer'><XMarkIcon className='size-7' /></button>
                            
                                    <div className='w-full flex justify-center text-2xl font-bold'>Cart</div>
                                    
                                    <div className='max-h-100 overflow-y-auto grid grid-cols-1 gap-y-2 mt-3'>
                                        <div className='flex'>
                                            <img src={Shirt} className='w-25' />
                                            <div className='relative block w-full'>
                                                <div className='flex'>
                                                    <div>Shirt</div>
                                                    <div className='ml-auto'>35 THB</div>
                                                </div>
                                                <div className='flex w-full'>
                                                    <div className='text-gray-400'>Black</div>
                                                    
                                                </div>
                                                <div className='absolute bottom-0'>
                                                    <div className='flex ml-auto items-center space-x-2'>
                                                        <div className=''><MinusIcon className='size-4' /></div>
                                                        <div>1</div>
                                                        <div className=''><PlusIcon className='size-4' /></div>
                                                    </div>
                                                </div>
                                                <div className='absolute bottom-0 right-0'>
                                                    <div className='ml-auto mt-auto'><TrashIcon className='size-5' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <img src={Shirt} className='w-25' />
                                            <div className='relative block w-full'>
                                                <div className='flex'>
                                                    <div>Shirt</div>
                                                    <div className='ml-auto'>35 THB</div>
                                                </div>
                                                <div className='flex w-full'>
                                                    <div className='text-gray-400'>Black</div>
                                                    
                                                </div>
                                                <div className='absolute bottom-0'>
                                                    <div className='flex ml-auto items-center space-x-2'>
                                                        <div className=''><MinusIcon className='size-4' /></div>
                                                        <div>1</div>
                                                        <div className=''><PlusIcon className='size-4' /></div>
                                                    </div>
                                                </div>
                                                <div className='absolute bottom-0 right-0'>
                                                    <div className='ml-auto mt-auto'><TrashIcon className='size-5' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <img src={Shirt} className='w-25' />
                                            <div className='relative block w-full'>
                                                <div className='flex'>
                                                    <div>Shirt</div>
                                                    <div className='ml-auto'>35 THB</div>
                                                </div>
                                                <div className='flex w-full'>
                                                    <div className='text-gray-400'>Black</div>
                                                    
                                                </div>
                                                <div className='absolute bottom-0'>
                                                    <div className='flex ml-auto items-center space-x-2'>
                                                        <div className=''><MinusIcon className='size-4' /></div>
                                                        <div>1</div>
                                                        <div className=''><PlusIcon className='size-4' /></div>
                                                    </div>
                                                </div>
                                                <div className='absolute bottom-0 right-0'>
                                                    <div className='ml-auto mt-auto'><TrashIcon className='size-5' /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <img src={Shirt} className='w-25' />
                                            <div className='relative block w-full'>
                                                <div className='flex'>
                                                    <div>Shirt</div>
                                                    <div className='ml-auto'>35 THB</div>
                                                </div>
                                                <div className='flex w-full'>
                                                    <div className='text-gray-400'>Black</div>
                                                    
                                                </div>
                                                <div className='absolute bottom-0'>
                                                    <div className='flex ml-auto items-center space-x-2'>
                                                        <div className=''><MinusIcon className='size-4' /></div>
                                                        <div>1</div>
                                                        <div className=''><PlusIcon className='size-4' /></div>
                                                    </div>
                                                </div>
                                                <div className='absolute bottom-0 right-0'>
                                                    <div className='ml-auto mt-auto'><TrashIcon className='size-5' /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-5 pt-3 border-t-1'>
                                        <div className='flex'>
                                            <div className=''>Subtotal</div>
                                            <div className='ml-auto '>140 THB</div>
                                        </div>
                                        <div className='flex'>
                                            <div className=''>Shipping</div>
                                            <div className='ml-auto '>19 THB</div>
                                        </div>

                                    </div>
                                    <div className='flex mt-3 pt-3 mb-2 border-t-1'>
                                        <div className='font-bold'>total</div>
                                        <div className='ml-auto font-bold'>159 THB</div>
                                    </div>
                                    <button className='bg-red-500 text-white w-full p-2 rounded-sm cursor-pointer'>Check out</button>

                                </div>
                            </>
                                
                            }
                        </div>
                        <div className='relative items-center'>
                            <button className='flex cursor-pointer'><UserIcon onClick={() => setProfileOpen(!isProfileOpen)} className='size-6 flex' /></button>
                            {isProfileOpen && <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <Link to="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</Link>
                                <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            {isMobileSearchOpen && (
                <div className='md:hidden absolute w-full'>
                    <div className='flex m-auto bg-white border max-w-sm w-auto rounded-3xl border-gray-500 focus:border-blue-500 p-3 focus-within:ring-2 focus-within:ring-blue-500'>
                        <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                        <input type='text' className='focus:outline-none pl-3 w-full' />
                    </div>
                </div>

            )}

        </nav>

    )
}

export default Header