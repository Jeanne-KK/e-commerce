import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'

function SignIn() {
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="w-full flex-grow flex justify-center items-center">
                <div className="flex w-95 flex-col md:border-1 rounded-lg py-10 px-10 gap-y-1">
                    <span className="font-bold text-lg">Sign In</span>
                    <span className="mt-4">Email</span>
                    <input type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Password</span>
                    <input type="password" className="w-full border-1 rounded-sm p-2" />
                    <span className="mt-1 ml-auto cursor-pointer text-[#3b82F6]">Forget password?</span>
                    <button className="border-1 rounded-sm p-2 bg-[#2563EB] text-white mt-1">Sign In</button>
                    <span className="mt-2 cursor-pointer">Don't have an account yet? <span className="text-[#3b82F6]">Sign Up</span></span>
                </div>

            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default SignIn;