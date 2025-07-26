import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const handleRegister = async () => {
        if (!(name && lastname && email && password)) {
            setErrMsg('Please fill in all required fields')
            return;
        }
        try {
            const res = await axios.post("http://localhost:3000/register", { email, name, lastname, password });

            //      get jwt token
            const token = res.data;
            localStorage.setItem('token', token);
            navigate("/");
            //console.log(token);

        } catch (err) {
            console.error("Register Failed:", err);
            setErrMsg('Please try again later');
        }
    }
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="w-full flex-grow flex justify-center items-center">
                <div className="flex w-110 flex-col md:border-1 rounded-lg py-10 px-10 gap-y-1">
                    {errMsg ? (
                        <>
                            <span className="font-bold text-lg text-red-600">Sign Up</span>
                            <span className="text-sm text-red-600">{errMsg}</span>
                        </>
                    ) : (
                        <span className="font-bold text-lg">Sign Up</span>

                    )}
                    <span className="mt-4">Name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Lastname</span>
                    <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Email</span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Password</span>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border-1 rounded-sm p-2" />
                    <button onClick={handleRegister} className="border-1 rounded-sm p-2 bg-blue-600 text-white mt-4">Sign Up</button>
                </div>

            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default SignUp;