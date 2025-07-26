import { ShoppingCartIcon, MagnifyingGlassIcon, UserIcon, TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from "react";
import logo from '../assets/name.png';
import Shirt from "../assets/shirt.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const [isMobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [itemCart, setItemCart] = useState([]);
    const [total, setTotal] = useState(0);

    const gotoCheckOut = async () => {
        const token = localStorage.getItem("token");
        if (itemCart.length === 0) {
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/checkLogin", {}, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.message === "login") {
                navigate("/checkout");
            }
        }catch {
            navigate("/signin")
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const getCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setItemCart(cart);
        const sum = cart.reduce((price, item) => price + (item.product[0].p_showprice * item.quantity), 0);
        //console.log(sum);
        setTotal(sum);
        setCartOpen(!isCartOpen);
    };

    const removeItem = (id, size, color) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const newCart = cart.filter(item => !(item.productId === id && item.size === size && item.color === color));
        localStorage.setItem("cart", JSON.stringify(newCart));
        const show = JSON.parse(localStorage.getItem("cart")) || [];
        const newSum = newCart.reduce((price, item) => price + (item.product[0].p_showprice * item.quantity), 0);
        setItemCart(show);
        setTotal(newSum);
    }



    useEffect(() => {
        const token = localStorage.getItem("token");
        const getInfo = async () => {
            try {
                const res = await axios.post("http://localhost:3000/info", {}, { headers: { Authorization: `Bearer ${token}` } });
                const { email, name, lastname } = res.data;
                setUser({ email, name, lastname });
            } catch (err) {
                console.error("Error fetching info:", err);
                setUser(null);
            }
        };

        getInfo();
    }, [])

    return (
        <nav>
            <div className='font-roboto grid grid-cols-2 justify-between bg-white'>
                <div className='flex pl-5 md:pl-10 py-5 items-center'>
                    <Link className='text-2xl' to={"/"}><img src={logo} alt="icon" className="w-32 h-auto rounded" /></Link>
                </div>
                <div className='flex w-auto justify-end pr-5 md:pr-10 py-5 items-center'>
                    <div className='flex gap-x-5 lg:gap-x-10 whitespace-nowrap items-center'>
                        <div className='hidden md:flex border max-w-sm rounded-3xl w-full border-gray-500 focus:border-blue-500 p-2 focus-within:ring-2 focus-within:ring-blue-500'>
                            <MagnifyingGlassIcon className='size-6 text-gray-500 ' />
                            <input type='text' className='focus:outline-none pl-3 w-full' />
                        </div>
                        <button onClick={() => setMobileSearchOpen(!isMobileSearchOpen)} className='flex md:hidden cursor-pointer'><MagnifyingGlassIcon className='size-6' /></button>

                        <div className='md:relative'>
                            <button onClick={() => getCart()} className='flex cursor-pointer'><ShoppingCartIcon className='size-6 flex' /></button>
                            {isCartOpen &&
                                <>
                                    <div className='fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden' onClick={() => setCartOpen(false)}></div>
                                    <div className='fixed inset-0 z-40 hidden md:block ' onClick={() => setCartOpen(false)}></div>
                                    <div className='absolute right-0 top-5 md:top-auto w-full md:w-100 p-5 bg-white border border-gray-200 rounded-md shadow-lg z-50 items-center '>
                                        <button onClick={() => setCartOpen(!isCartOpen)} className='absolute right-1 top-1 cursor-pointer'><XMarkIcon className='size-7' /></button>

                                        <div className='w-full flex justify-center text-2xl font-bold'>Cart</div>

                                        <div className='max-h-100 overflow-y-auto grid grid-cols-1 gap-y-2 mt-3'>

                                            {itemCart.map((rows) => (
                                                <div className='flex'>
                                                    <img src={`http://localhost:3000/img/${rows.productId}.png`} className='w-25' />
                                                    <div className='relative block w-full'>
                                                        <div className='flex'>
                                                            <div>{rows.product[0].p_name}</div>
                                                            <div className='ml-auto'>{rows.product[0].p_showprice * rows.quantity} THB</div>
                                                        </div>
                                                        <div className='flex w-full'>
                                                            <div className='text-gray-400'>{rows.color}</div>
                                                        </div>
                                                        <div>
                                                            <div className=''>{rows.size}</div>
                                                        </div>
                                                        <div>
                                                            <div className=''>{rows.quantity} pieces</div>
                                                        </div>

                                                        <button className='absolute bottom-0 right-0'>
                                                            <div onClick={() => removeItem(rows.productId, rows.size, rows.color)} className='ml-auto mt-auto cursor-pointer'><TrashIcon className='size-5' /></div>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className='mt-5 pt-3 border-t-1'>
                                            <div className='flex'>
                                                <div className=''>Subtotal</div>
                                                <div className='ml-auto '>{total} THB</div>
                                            </div>
                                            <div className='flex'>
                                                <div className=''>Shipping</div>
                                                <div className='ml-auto '>19 THB</div>
                                            </div>

                                        </div>
                                        <div className='flex mt-3 pt-3 mb-2 border-t-1'>
                                            <div className='font-bold'>total</div>
                                            <div className='ml-auto font-bold'>{total + 19} THB</div>
                                        </div>
                                        <button onClick={() => gotoCheckOut()} className='bg-red-500 text-white w-full p-2 rounded-sm cursor-pointer'>Check out</button>

                                    </div>
                                </>

                            }
                        </div>
                        <div className='relative items-center'>
                            <button className='flex cursor-pointer'><UserIcon onClick={() => setProfileOpen(!isProfileOpen)} className='size-6 flex' /></button>
                            {isProfileOpen && <div className="absolute right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                {user ? (
                                    <>
                                        <span className='flex justify-center my-3 text-md text-gray-700'>Welcome, {user.name}</span>
                                        <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">History</Link>
                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left cursor-pointer">Log out</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/signin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</Link>
                                        <Link to="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Up</Link>
                                    </>
                                )
                                }
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