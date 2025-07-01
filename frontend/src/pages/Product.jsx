import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import Footer from "../components/Footer";

function Product() {

    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:pt-10 gap-y-5 text-lg xl:text-xl pl-5 pr-5">
                <div className="flex justify-center md:justify-end"><img src={Shirt} className="w-sm xl:w-lg" /></div>
                <div className="space-y-5 xl:space-y-10 md:pl-5 md:pr-5">
                    <div>Shirt</div>
                    <div>Color:</div>
                    <div className="ml-10 flex gap-x-10">
                        <div className="w-6 h-6 border-1 rounded-full bg-green-500"></div>
                        <div className="w-6 h-6 border-1 rounded-full bg-blue-500"></div>
                        <div className="w-6 h-6 border-1 rounded-full bg-black"></div>
                        <div className="w-6 h-6 border-1 rounded-full bg-white-500"></div>
                    </div>
                    <div>Size:</div>
                    <div className="ml-10 flex gap-x-10">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                    </div>
                    <div>35 THB</div>
                    <div className='flex ml-auto items-center space-x-10'>
                        <div className=''><MinusIcon className='size-4' /></div>
                        <div>1</div>
                        <div className=''><PlusIcon className='size-4' /></div>
                    </div>
                    <button className="bg-indigo-600 text-white w-full md:max-w-75 p-3 rounded-md cursor-pointer">Add to cart</button>
                </div>

            </div>
            <div className="mt-10 sm:mt-auto">
                <Footer />
            </div>

        </div>

    )
}

export default Product;