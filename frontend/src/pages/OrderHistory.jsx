import Header from "../components/Header";
import Shirt from "../assets/shirt.png";

import Footer from "../components/Footer";
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function OrderHistory() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [data, setData] = useState([]);



    useEffect(() => {
        const o = searchParams.get('o');
        if (o === null) {
            navigate("/history");
        }
        const token = localStorage.getItem("token");
        const getOrderDetail = async () => {
            try {
                const res = await axios.post("http://localhost:3000/orderdetail", { o }, { headers: { Authorization: `Bearer ${token}` } });
                console.log(res.data);
                renderItem(res.data);
                setData(res.data);


            } catch (err) {
                
                console.error("Error fetching info:", err);
                navigate("/");

            }
        };

        getOrderDetail();
    }, []);

    function renderStatus(status) {
        switch (status) {
            case 0:
                return <span className="text-yellow-500">Pending Payment</span>
            case 1:
                return <span className="text-green-600">Complete</span>;
            case 2:
                return <span className="text-blue-500">Deliver</span>;
            case 3:
                return <span className="text-red-500">Cancel</span>;
            default:
                return <span className="text-gray-500">Unknown Status</span>;
        }
    }

    function localDate(date) {
        const local = new Date(date);
        const month = local.toLocaleDateString('en-US', { month: 'long' });
        const day = local.getDate();
        const year = local.getFullYear();
        const hour = local.getHours();
        const min = local.getMinutes();
        const dateShow = `${month} ${day}, ${year} at ${hour}:${min}`
        //console.log(dateShow);
        return dateShow;
    }

    function renderStatusPaid(status) {
        switch (status) {
            case 0:
                return "Not paid";
            case 1:
                return "Paid";
            case 2:
                return "Paid";
            case 3:
                return "Not paid";
            default:
                return "Unknow";
        }
    }

    function renderItem(item) {
        return item.map((rows) => (
            <div className="mt-3 flex">
                <img src={`http://localhost:3000/img/${rows.p_id}.png`} className="w-30 md:w-40" />
                <div className="flex flex-col ml-1 md:ml-3">
                    <span>{rows.p_name} - {rows.v_color}</span>
                    <span className="text-sm md:text-base">Size {rows.v_size} x {rows.v_quantity} - {rows.v_price * rows.v_quantity} THB</span>  
                </div>
            </div>
        ))
    }

    function renderStatusInvo(status) {
        switch (status) {
            case 0:
                return (<>
                    <div className="grid grid-cols-1  mt-5">
                        <span className="flex justify-center cursor-pointer hover:underline">Pay Now</span>
                    </div>
                </>)
            case 1:
                return (<>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-50 gap-y-3 mt-5">
                        <span className="flex justify-start md:justify-end cursor-pointer hover:underline">Print Invoice</span>
                        <span className="cursor-pointer hover:underline">Download Receipt</span>
                    </div>
                </>)
            case 2:
                return (<>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-50 gap-y-3 mt-5">
                        <span className="flex justify-start md:justify-end cursor-pointer hover:underline">Print Invoice</span>
                        <span className="cursor-pointer hover:underline">Download Receipt</span>
                    </div>
                </>)
            default:
                return (<>
                    <div className="grid grid-cols-1  mt-5">
                    
                    </div>
                </>)
        }
    }



    return data.length > 0 && (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 lg:ml-20 lg:mr-20 xl:ml-50 xl:mr-50 2xl:ml-100 2xl:mr-100 mb-10">
                <span className="ml-30">Order Details – Order #{data[0].o_id}</span>
                <div className="flex flex-col border-b-1 pb-3 mt-10">
                    <span>Date: <span>{localDate(data[0].o_date)}</span></span>
                    <span>Status: {renderStatus(data[0].o_status)}</span>
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Purchased Items</span>
                    {renderItem(data)}
                    
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Summary</span>
                    <div className="mt-3 flex flex-col">
                        <span>Subtotal: {data[0].o_totalprice - 19} THB</span>
                        <span>Shipping Fee: 19 THB</span>
                        <span>Total: {data[0].o_totalprice} THB</span>
                    </div>
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Shipping Info</span>
                    <div className="mt-3 flex flex-col">
                        <span>Name: {data[0].o_name}</span>
                        <span>Phone: {data[0].o_phone}</span>
                        <span>Address: {data[0].o_address}</span>
                    </div>
                </div>
                <div className="flex flex-col border-b-1 pb-3 mt-5">
                    <span className="ml-0 flex justify-center md:justify-start md:ml-30">Payment</span>
                    <div className="mt-3 flex flex-col">
                        <span>Method: Bank Transfer</span>
                        <span>Status: {renderStatusPaid(data[0].o_status)}</span>
                    </div>
                </div>
                {renderStatusInvo(data[0].o_status)}
            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default OrderHistory