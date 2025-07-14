import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async () => {
        
        if(!(email && password)){
            setErrMsg("Enter Email and Password");
            return;
        }
        
        try {
            const res = await axios.post("http://localhost:3000/login", { email, password });

            //      get jwt token
            const token = res.data;
            localStorage.setItem('token', token);
            navigate("/");
            //console.log(token);
        } catch (err) {
            console.error("Login Failed:", err);
            setErrMsg('Email or Password Incorrect');
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="w-full flex-grow flex justify-center items-center">
                <div className="flex w-95 flex-col md:border-1 rounded-lg py-10 px-10 gap-y-1">
                    {errMsg ? (
                        <>
                            <span className="font-bold text-lg text-red-600">Sign In </span>
                            <span className="text-sm text-red-600">{errMsg}</span>
                        </>
                    ) : (
                        <span className="font-bold text-lg">Sign In</span>

                    )}

                    <span className="mt-4">Email</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Password</span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border-1 rounded-sm p-2" />
                    <span className="mt-1 ml-auto cursor-pointer text-[#3b82F6]">Forget password?</span>
                    <button onClick={handleLogin} className="border-1 rounded-sm p-2 bg-[#2563EB] text-white mt-1">Sign In</button>
                    <span className="mt-2 cursor-pointer">Don't have an account yet? <Link to={"/signup"} className="text-[#3b82F6]">Sign Up</Link></span>
                </div>

            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default SignIn;