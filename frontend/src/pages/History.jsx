import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";



function History() {
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 lg:ml-20 lg:mr-20 2xl:ml-100 2xl:mr-100">
                <span className="ml-30">My Orders</span>
                <div className="grid grid-cols-2 md:grid-cols-6 pb-5 md:pb-2 border-b-1 mt-10 gap-x-1 gap-y-3">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Order ID:</span>
                        <span >#10101</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Date:</span>
                        <span >June 27, 2025 at 00:10</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total:</span>
                        <span>170 THB</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Status:</span>
                        <span className="text-yellow-500">Pending Payment</span>
                    </div>
                    <div className="flex justify-center items-center text-red-500 hover:underline cursor-pointer ">
                        <button className="border-1 w-full rounded-sm p-1 border-red-500 hover:underline text-red-500 cursor-pointer">
                            Cancel
                        </button>

                    </div>
                    <div className="flex justify-center items-center    ">
                        <button className="border-1 w-full rounded-sm p-1 border-gray-300 hover:underline text-black cursor-pointer">View Detail</button>
                    </div>

                    
                </div>
                <div className="grid grid-cols-2 md:grid-cols-6 pb-5 md:pb-2 border-b-1 mt-10 gap-x-1 gap-y-3">
                    <div className="flex flex-col">
                        <span className="text-gray-500">Order ID:</span>
                        <span>#10009</span>
                        
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Date:</span>
                        <span >June 24, 2025 at 00:10</span>
                        
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Total:</span>
                        <span>100 THB</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500">Status:</span>
                        <span className="text-green-500">Delivered</span>
                    </div>
                    <div className="flex justify-center items-center text-red-500 hover:underline cursor-pointer ">
                        <button className="border-1 w-full rounded-sm p-1 border-[#4f39f6]  hover:underline text-white bg-[#4f39f6] cursor-pointer">
                            Reorder
                        </button>

                    </div>
                    <div className="flex justify-center items-center    ">
                        <button className="border-1 w-full rounded-sm p-1 border-gray-300 hover:underline text-black cursor-pointer">View Detail</button>
                    </div>

                    
                </div>
                
            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default History