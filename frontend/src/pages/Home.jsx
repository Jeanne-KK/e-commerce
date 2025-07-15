import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';



function Home() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get("http://localhost:3000/product");
                console.log(res.data);
                setProduct(res.data);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        getProduct();
    }, [])
    return (
        <div className="flex flex-col min-h-screen font-roboto">
            <div><Header /></div>
            <div className="ml-10 mr-10 md:mr-10 md:ml-10 md:ml-15 md:mr-15 lg:ml-20 lg:mr-20 xl:ml-70 xl:mr-70 lg:pt-15 bg-white">
                <h2 className="text-3xl font-bold">Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-between gap-x-10 gap-y-5 mt-5">
                    {product.map((rows) => (
                        <Link to="/product" className="relative">
                            <img src={`http://localhost:3000/img/${rows.p_id}.png`} className="w-full h-auto hover:opacity-50 transform-1" />
                            <div className="flex">
                                <div>{rows.p_name}</div>
                                <div className="ml-auto">{rows.p_showprice} THB</div>
                            </div>
                            <div className="text-gray-400">
                                {rows.p_showcolor.charAt(0).toUpperCase() + rows.p_showcolor.slice(1)}
                            </div>
                            <div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-10 md:mt-auto">
                <Footer />
            </div>


        </div>
    )
}

export default Home