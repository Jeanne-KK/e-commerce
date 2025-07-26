import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function History() {
    const navigate = useNavigate(); 
    const [history, setHistory] = useState([]);
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        const getHistory = async () => {
            try {
                const res = await axios.post("http://localhost:3000/orderhistory", {}, { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                setHistory(res.data);

            } catch (err) {
                console.error("Error fetching info:", err);

            }
        };

        getHistory();
    }, []);

    function renderStatus(status) {
        switch (status) {
            case 0:
                return <span className="text-yellow-500">Pending Payment</span>
            case 1:
                return <span className="text-green-600">Complete</span>;
            case 2:
                return <span className="text-blue-500">Deliver</span>;
            default:
                return <span className="text-gray-500">Unknown Status</span>;
        }
    }

    function cancelOrder(orderId){
        console.log(orderId);

    }

    function viewDetail(page){
        navigate(`/order?o=${page}`);
    }

    function renderStatusDetail(status, orderId) {
        switch (status) {
            case 0:
                return (
                    <>
                        <div className="flex justify-center items-center text-red-500 hover:underline cursor-pointer ">
                            <button onClick={()=>cancelOrder(orderId)} className="border-1 w-full rounded-sm p-1 border-red-500 hover:underline text-red-500 cursor-pointer">
                                Cancel
                            </button>
                        </div>
                        <div className="flex justify-center items-center    ">
                            <button onClick={()=>viewDetail(orderId)} className="border-1 w-full rounded-sm p-1 border-gray-300 hover:underline text-black cursor-pointer">View Detail</button>
                        </div>
                    </>
                )


            case 1:
                return (
                    <>
                        <div className="flex justify-center items-center text-red-500 hover:underline cursor-pointer ">
                            <button className="border-1 w-full rounded-sm p-1 border-[#4f39f6]  hover:underline text-white bg-[#4f39f6] cursor-pointer">
                                Reorder
                            </button>
                        </div>
                        <div className="flex justify-center items-center    ">
                            <button onClick={()=>viewDetail(orderId)} className="border-1 w-full rounded-sm p-1 border-gray-300 hover:underline text-black cursor-pointer">View Detail</button>
                        </div>
                    </>
                )


            case 2:
                return (<>
                    <div className="flex justify-center items-center text-red-500 hover:underline cursor-pointer ">
                        <button className="border-1 w-full rounded-sm p-1 border-[#4f39f6]  hover:underline text-white bg-[#4f39f6] cursor-pointer">
                            Reorder
                        </button>
                    </div>
                    <div className="flex justify-center items-center    ">
                        <button onClick={()=>viewDetail(orderId)} className="border-1 w-full rounded-sm p-1 border-gray-300 hover:underline text-black cursor-pointer">View Detail</button>
                    </div>
                </>)

            default:
                return <></>
        }
    }

    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 lg:ml-20 lg:mr-20 2xl:ml-100 2xl:mr-100">
                <span className="ml-30">My Orders</span>
                {history.map((rows) => (
                    <div className="grid grid-cols-2 md:grid-cols-6 pb-5 md:pb-2 border-b-1 mt-10 gap-x-1 gap-y-3">
                        <div className="flex flex-col">
                            <span className="text-gray-500">Order ID:</span>
                            <span >#{rows.o_id}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500">Date:</span>
                            <span >June 27, 2025 at 00:10</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500">Total:</span>
                            <span>{rows.o_totalprice} THB</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500">Status:</span>

                            {renderStatus(rows.o_status)}


                        </div>
                        {renderStatusDetail(rows.o_status, rows.o_id)}


                    </div>
                ))}
                

            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default History