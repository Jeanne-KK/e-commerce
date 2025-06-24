import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/solid'
import { useState } from "react";
import shirtImage from '../assets/name.png';


function Header() {
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);

    return (
        <nav>
            <div className='font-roboto grid grid-cols-2 justify-between bg-white'>
                <div className='flex pl-5 md:pl-10 py-5 items-center'>
                    <a className='text-2xl' href='#home'><img src={shirtImage} alt="icon" className="w-32 h-auto rounded" /></a>
                </div>
                <div className='flex w-auto justify-end pr-5 md:pr-10 py-5 items-center'>
                    <div className='flex gap-x-5 lg:gap-x-10 whitespace-nowrap items-center'>
                        <div className='hidden md:flex border max-w-sm rounded-3xl w-full border-gray-500 focus:border-blue-500 p-2 focus-within:ring-2 focus-within:ring-blue-500'>
                            <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                            <input type='text' className='focus:outline-none pl-3 w-full' />
                        </div>
                        <button onClick={() => setMobileSearchOpen(!isMobileSearchOpen)} className='flex md:hidden cursor-pointer'><MagnifyingGlassIcon className='size-6' /></button>
                        <a href='#cart'><ShoppingCartIcon className='size-6 flex' /></a>
                        <div className='relative items-center'>
                            <button className='flex cursor-pointer'><UserIcon onClick={() => setProfileOpen(!isProfileOpen)} className='size-6 flex' /></button>
                            {isProfileOpen && <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                <a href="#signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</a>
                                <a href="#signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</a>
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