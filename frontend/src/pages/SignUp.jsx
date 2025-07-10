import Header from "../components/Header";
import Footer from "../components/Footer";
import Shirt from "../assets/shirt.png";
import { TrashIcon, PlusIcon, MinusIcon, XMarkIcon } from '@heroicons/react/24/solid'

function SignUp() {
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="w-full flex-grow flex justify-center items-center">
                <div className="flex w-110 flex-col md:border-1 rounded-lg py-10 px-10 gap-y-1">
                    <span className="font-bold text-lg">Sign Up</span>
                    <span className="mt-4">Name</span>
                    <input type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Lastname</span>
                    <input type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Email</span>
                    <input type="text" className="w-full border-1 rounded-sm p-2" />
                    <span className="">Password</span>
                    <input type="password" className="w-full border-1 rounded-sm p-2" />
                    <button className="border-1 rounded-sm p-2 bg-blue-600 text-white mt-4">Sign Up</button>
                </div>

            </div>
            <div className="mt-auto"><Footer /></div>

        </div>
    )
}

export default SignUp;