import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { useState } from "react";

function Header() {
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <nav>
            <div className='font-roboto grid grid-cols-3 justify-between bg-white'>
                <div className='flex px-10 py-5 items-center'>
                    <a className='text-2xl' href='#home'>Home</a>

                </div>
                <div className='flex justify-center px-10 py-5 items-center'>
                    <div className='hidden lg:flex border rounded-sm w-full border-gray-500 focus:-blue-500 p-3 focus-within:ring-2 focus-within:ring-blue-500'>
                        <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                        <input type='text' className='focus:outline-none pl-3 w-full' />

                    </div>

                </div>
                <div className='flex w-auto justify-end px-10 py-5 items-center'>
                    <div className='flex space-x-5 whitespace-nowrap items-center'>
                        <button onClick={() => setMobileSearchOpen(!isMobileSearchOpen)} className='lg:hidden cursor-pointer'><MagnifyingGlassIcon className='size-6' /></button>
                        <a href='#cart'><ShoppingCartIcon className='size-6' /></a>
                        <a className='text-lg' href='#login'>Log in</a>
                    </div>

                </div>
            </div>
            
            {isMobileSearchOpen && (
                <div className='bg-white/50 absolute w-full'>
                    <div className='lg:hidden flex border mx-10 w-auto rounded-sm border-gray-500 focus:border-blue-500 p-3 focus-within:ring-2 focus-within:ring-blue-500'>
                        <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                        <input type='text' className='focus:outline-none pl-3 w-full' />
                    </div>
                </div>

            )}

        </nav>

    )
}

export default Header