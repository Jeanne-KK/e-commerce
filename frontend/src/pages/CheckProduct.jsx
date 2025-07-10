import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useState } from "react";



function CheckProduct() {
    const [isAddOpen, setAddOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 lg:ml-20 lg:mr-20 2xl:ml-70 2xl:mr-70">
                <div className="flex items-center">
                    <span className="ml-5 md:ml-30 ">Manage Products </span>
                    <button onClick={() => setAddOpen(true)} className="border-1 rounded-sm pl-3 pr-3 p-1 ml-auto text-white bg-[#4f39f6] cursor-pointer">
                        + Add Product
                    </button>
                    {isAddOpen && 
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm md:backdrop-blur-none flex justify-center items-center z-50">
                        <div className="flex flex-col bg-white p-6 shadow-lg w-80 gap-y-2">
                            <span className="font-bold flex text-lg">Add Product</span>
                            <span className="flex">Image:</span>
                            <label htmlFor="fileUpload" className="border-1 cursor-pointer rounded-xs w-30 text-center text-sm">Upload Image</label>
                            <input id="fileUpload" type="file" className="hidden" />
                            <span>Name:</span>
                            <input type="text" className="border-1 rounded-sm p-1" />
                            <span>Price:</span>
                            <input type="text" className="border-1 rounded-sm p-1" />
                            <span>Stock:</span>
                            <div className="flex gap-x-2">
                                <input placeholder="#12345" type="text" className="border-1 rounded-sm p-1 w-full" />
                                <input placeholder="Quantity" type="text" className="border-1 rounded-sm p-1 w-full" />
                            </div>
                            <div className="flex ">
                                <button onClick={() => setAddOpen(!isAddOpen)} className="w-32 border-1 rounded-sm pl-3 pr-3 p-1 text-white bg-red-600 cursor-pointer">Cancel</button>
                                <button className="w-32 border-1 rounded-sm pl-3 pr-3 p-1 ml-auto text-white bg-[#4f39f6] cursor-pointer">Add Product</button>
                            </div>

                        </div>
                    </div>
                    }
                    

                </div>
                <div className="">

                    <div className="hidden md:grid grid-cols-2 md:grid-cols-6 pb-5 md:pb-2 mt-10 gap-y-3 ">
                        <div className="flex flex-col">
                            <span className="font-bold">Image</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Name</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Price</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Stock</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Edit</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Delete</span>
                        </div>
                    </div>
                    <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-6 pb-5 md:pb-2 mt-2 gap-x-1 gap-y-1 md:gap-y-3">
                        <div className="flex flex-col items-center md:items-left">
                            <img src={Shirt} className="w-40" />
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="">Shirt</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            35 THB
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <div className="gap-y-1 flex flex-col">
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-green-500"></div>
                                    <span className="ml-5"> 10</span>
                                </div>
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-blue-500"></div>

                                    <span className="ml-5"> 3</span>
                                </div>
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-black"></div>

                                    <span className="ml-5"> 4</span>
                                </div>
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-white-500"></div>

                                    <span className="ml-5"> 2</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <PencilIcon className='size-5 hidden md:block' />
                            <button className="border-1 rounded-sm pl-3 pr-3 p-1 text-white bg-[#4f39f6] cursor-pointer md:hidden">Edit</button>

                        </div>
                        <div className="flex flex-col">
                            <TrashIcon className='size-5 hidden md:block' />
                            <button className="border-1 rounded-sm pl-3 pr-3 p-1 text-white bg-red-600 cursor-pointer md:hidden">Remove</button>
                            

                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 grid grid-cols-1 md:grid-cols-6 pb-5 md:pb-2 mt-2 gap-x-1 gap-y-1 md:gap-y-3">
                        <div className="flex flex-col items-center md:items-left">
                            <img src={Shirt} className="w-40" />
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <span className="">Hoodie</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            1700 THB
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <div className="gap-y-1 flex flex-col">
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-green-500"></div>
                                    <span className="ml-5"> 17</span>
                                </div>
                                <div className="flex">
                                    <div className="w-6 h-6 border-1 rounded-full bg-blue-500"></div>

                                    <span className="ml-5"> 2</span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <PencilIcon className='size-5 hidden md:block' />
                            <button className="border-1 rounded-sm pl-3 pr-3 p-1 text-white bg-[#4f39f6] cursor-pointer md:hidden">Edit</button>

                        </div>
                        <div className="flex flex-col">
                            <TrashIcon className='size-5 hidden md:block' />
                            <button className="border-1 rounded-sm pl-3 pr-3 p-1 text-white bg-red-600 cursor-pointer md:hidden">Remove</button>
                            

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default CheckProduct