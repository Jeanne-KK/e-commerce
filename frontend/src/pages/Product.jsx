import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Product() {
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const p = searchParams.get('p');

    useEffect(() => {
        
        const getTitle = async () => {
            try {
                const res = await axios.post("http://localhost:3000/productVariant", {p});
                console.log(res.data);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        getTitle();
    }, [])
    
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:pt-10 gap-y-5 text-lg xl:text-xl pl-5 pr-5">
                <div className="flex justify-center md:justify-end"><img src={`http://localhost:3000/img/${p}.png`} className="w-sm xl:w-lg" /></div>
                <div className="space-y-5 xl:space-y-10 md:pl-5 md:pr-5">
                    <div>{product?.[0]?.p_name || 'Loading...'}</div>
                    <div>Color:</div>
                    <div className="ml-10 flex gap-x-10">
                        {product.map((rows) =>(
                            <div className={`w-6 h-6 border-1 rounded-full bg-${rows.v_color}`}></div>

                        ))}
                    </div>
                    <div>Size:</div>
                    <div className="ml-10 flex gap-x-10">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                    </div>
                    <div>{product?.[0]?.p_showprice || 'Loading...'} THB</div>
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