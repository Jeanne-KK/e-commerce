import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'

function Checkout() {
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-5 mr-5 md:ml-20 md:mr-20 gap-y-10 md:gap-y-0 gap-x-10">
                <div className="flex flex-col">
                    <div className="flex justify-center">1. Items in Cart</div>
                    <div className='max-h-100 md:max-h-150 overflow-y-auto grid grid-cols-1 gap-y-2 mt-3'>
                        <div className='flex'>
                            <img src={Shirt} className='w-35 xl:w-40' />
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
                            <img src={Shirt} className='w-35 xl:w-40' />
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
                            <img src={Shirt} className='w-35 xl:w-40' />
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
                            <img src={Shirt} className='w-35 xl:w-40' />
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
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center">2. Shipping Address</div>
                    <div className="mt-3">
                        <div>
                            <span>Full Name:</span>
                            <input type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Phone Number:</span>
                            <input type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Email:</span>
                            <input type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Address:</span>
                            <textarea
                                rows="4"
                                class="border p-2 w-full rounded-md "
                            ></textarea>
                            <span>Postal Code:</span>
                            <input type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Additional Notes:</span>
                            <textarea
                                rows="4"
                                class="border p-2 w-full rounded-md "
                            ></textarea>
                        </div>
                        

                    </div>
                </div>
                <div className="hidden md:flex lg:hidden"></div>
                <div className="flex flex-col mb-20 md:mb-0">
                    <div className="flex justify-center">3. Payment Summary</div>
                    <div className="mt-3">
                        <div className="flex">
                            <span>Subtotal:</span>
                            <span className='ml-auto'>140 THB</span>
                        </div>
                        <div className="flex">
                            <span>Shipping Fee:</span>
                            <span className='ml-auto'>19 THB</span>
                        </div>
                        <div className='flex mt-3 pt-3 mb-2 border-t-1'>
                            <span className='font-bold'>total</span>
                            <span className='ml-auto font-bold'>159 THB</span>
                        </div>
                        <button className='bg-red-500 text-white w-full p-2 rounded-sm cursor-pointer'>Check out</button>
                    </div>
                </div>


            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default Checkout;