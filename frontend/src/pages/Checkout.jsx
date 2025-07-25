import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Checkout() {
    const navigate = useNavigate();
    const [itemCart, setItemCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [postal, setPostal] = useState('');
    const [note, setNote] = useState('');

    const checkOut = () => {
        console.log(email);
        console.log(name);
        console.log(phone);
        console.log(address);
        console.log(postal);
        console.log(note);
    };

    const removeItem = (id, size, color) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = cart.filter(item => !(item.productId === id && item.size === size && item.color === color));
        localStorage.setItem("cart", JSON.stringify(newCart));
        const show = JSON.parse(localStorage.getItem("cart")) || [];
        const newSum = newCart.reduce((price, item) => price + (item.product[0].p_showprice * item.quantity), 0);
        setItemCart(show);
        setTotal(newSum);
    };

    const orderItem = async () => {
        try {
            const token = localStorage.getItem("token");
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const res = await axios.post("http://localhost:3000/order", { cart, address, name, email, phone, postal, note }, { headers: { Authorization: `Bearer ${token}` } });
            //console.log(res.data.message);
            
            if(res.data.message){
                localStorage.removeItem("cart");
                navigate("/history");
            }
            
        } catch (err) {
            console.error("Fail Ordered:", err);
        }
    };

    useEffect(() => {
        const loadCart = async () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const newSum = cart.reduce((price, item) => price + (item.product[0].p_showprice * item.quantity), 0);
            setItemCart(cart);
            setTotal(newSum);
        }

        const loadName = async () => {
            const token = localStorage.getItem("token");
            const res = await axios.post("http://localhost:3000/info", {}, { headers: { Authorization: `Bearer ${token}` } });
            setEmail(res.data.email);
            setName(`${res.data.name} ${res.data.lastname}`);

        }
        const checkLogin = async () => {
            try {
                const token = localStorage.getItem("token");
                const checkLogin = await axios.post("http://localhost:3000/checkLogin", {}, { headers: { Authorization: `Bearer ${token}` } });
                loadCart();
                loadName();
            } catch (err) {
                navigate("/signin");
            }
        }
        checkLogin();
    }, []);

    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-5 mr-5 md:ml-20 md:mr-20 gap-y-10 md:gap-y-0 gap-x-10">
                <div className="flex flex-col">
                    <div className="flex justify-center">1. Items in Cart</div>
                    <div className='max-h-100 md:max-h-150 overflow-y-auto grid grid-cols-1 gap-y-2 mt-3'>

                        {itemCart.map((rows) => (
                            <div className='flex'>
                                <img src={`http://localhost:3000/img/${rows.productId}.png`} className='w-35 xl:w-40' />
                                <div className='relative block w-full'>
                                    <div className='flex'>
                                        <div>{rows.product[0].p_name}</div>
                                        <div className='ml-auto'>{rows.product[0].p_showprice * rows.quantity} THB</div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className='text-gray-400'>{rows.color}</div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className=''>{rows.size}</div>
                                    </div>
                                    <div className='flex w-full'>
                                        <div className=''>{rows.quantity} pieces</div>
                                    </div>

                                    <div className='absolute bottom-0 right-0'>
                                        <button onClick={() => removeItem(rows.productId, rows.size, rows.color)} className='ml-auto mt-auto'><TrashIcon className='size-5 cursor-pointer' /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-center">2. Shipping Address</div>
                    <div className="mt-3">
                        <div>
                            <span>Full Name:</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Phone Number:</span>
                            <input type='text' onChange={(e) => setPhone(e.target.value)} className='border-1 p-2 w-full rounded-md' />
                            <span>Email:</span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Address:</span>
                            <textarea
                                rows="4"
                                class="border p-2 w-full rounded-md "
                                onChange={(e) => setAddress(e.target.value)}
                            ></textarea>
                            <span>Postal Code:</span>
                            <input onChange={(e) => setPostal(e.target.value)} type='text' className='border-1 p-2 w-full rounded-md' />
                            <span>Additional Notes:</span>
                            <textarea
                                rows="4"
                                class="border p-2 w-full rounded-md "
                                onChange={(e) => setNote(e.target.value)}
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
                            <span className='ml-auto'>{total} THB</span>
                        </div>
                        <div className="flex">
                            <span>Shipping Fee:</span>
                            <span className='ml-auto'>19 THB</span>
                        </div>
                        <div className='flex mt-3 pt-3 mb-2 border-t-1'>
                            <span className='font-bold'>total</span>
                            <span className='ml-auto font-bold'>{total + 19} THB</span>
                        </div>
                        <button onClick={() => orderItem()} className='bg-red-500 text-white w-full p-2 rounded-sm cursor-pointer'>Check out</button>

                    </div>
                </div>


            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default Checkout;