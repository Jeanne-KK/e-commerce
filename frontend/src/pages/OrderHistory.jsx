import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";



function OrderHistory() {
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 lg:ml-20 lg:mr-20 xl:ml-50 xl:mr-50 2xl:ml-100 2xl:mr-100 mb-10">
                <span className="ml-30">Order Details – Order #10101</span>
                <div className="flex flex-col border-b-1 pb-3 mt-10">
                    <span>Date: <span>June 27, 2025 at 00:10</span></span>
                    <span>Status: <span className="text-yellow-500">Pending Payment</span></span>
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Purchased Items</span>
                    <div className="mt-3 flex">
                        <img src={Shirt} className="w-30 md:w-40" />
                        <div className="flex flex-col ml-1 md:ml-3">
                            <span>Shirt - Black</span>
                            <div className="flex flex-col ml-3">
                                <span className="text-sm md:text-base">- Size M x 1 - 170 THB</span>
                                <span className="text-sm md:text-base">- Size L x 2 - 340 THB</span>
                            </div>
                            <span>Subtotal: 510 THB</span>
                        </div>
                    </div>
                    <div className="mt-3 flex">
                        <img src={Shirt} className="w-30 md:w-40" />
                        <div className="flex flex-col ml-1 md:ml-3">
                            <span>Shirt - Black</span>
                            <div className="flex flex-col ml-3">
                                <span className="text-sm md:text-base">- Size M x 1 - 1700 THB</span> 
                            </div>
                            <span>Subtotal: 1700 THB</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Summary</span>
                    <div className="mt-3 flex flex-col">
                        <span>Subtotal: 1100 THB</span> 
                        <span>Shipping Fee: 50 THB</span> 
                        <span>Total: 1150 THB</span> 
                    </div> 
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Shipping Info</span>
                    <div className="mt-3 flex flex-col">
                        <span>Name: Banana Chocolate</span> 
                        <span>Phone: 080-xxxxxxx</span>
                        <span>Address: 2 Moo 9 Chaimeng</span>
                    </div> 
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Payment</span>
                    <div className="mt-3 flex flex-col">
                        <span>Method: Bank Transfer</span> 
                        <span>Status: Not paid</span> 
                    </div> 
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-50 gap-y-3 mt-5">
                    <span className="flex justify-start md:justify-end cursor-pointer hover:underline">Print Invoice</span>
                    <span className="cursor-pointer hover:underline">Download Receipt</span>

                </div>




            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default OrderHistory