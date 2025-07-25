import Header from "../components/Header";
import Shirt from "../assets/shirt.png";
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios, { all } from 'axios';
import { useSearchParams } from 'react-router-dom';

function Product() {
    const [searchParams] = useSearchParams();
    const [product, setProduct] = useState([]);
    const [show, setShow] = useState([]);
    const p = searchParams.get('p');
    const [gsize, setGsize] = useState([]);
    const [amount, setAmount] = useState(1);
    const [stocknow, setStocknow] = useState([]);
    const [colornow, setColornow] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [maxAmount, setMaxAmount] = useState(1);
    const [checkColor, setCheckColor] = useState(false);
    const [checkSize, setCheckSize] = useState(false);
    const [productId, setProductId] = useState('');
    const allSizes = ['S', 'M', 'L']
    

    const addToCart = () => {
        //console.log(maxAmount);
        //      check to select color
        if (colornow === "") {
            setCheckColor(true);
        }else{
            setCheckColor(false);
        }

        //      check to select size
        if (selectedSize === "") {
            setCheckSize(true);
        }else{
            setCheckSize(false);
        }
        if (colornow != "" && selectedSize != "") {
            //console.log(productId);
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const vID = show.findIndex((item) => item.v_size === selectedSize && item.v_color === colornow);
            //console.log(show[vID].v_id);
            
            const existingIndex = cart.findIndex((item) => item.varintID === show[vID].v_id);

            if(existingIndex !== -1){
                if(cart[existingIndex].quantity + amount <= maxAmount){
                    cart[existingIndex].quantity += amount;
                }else{
                    cart[existingIndex].quantity = maxAmount;
                }
            }else{
                cart.push({varintID: show[vID].v_id, productId: productId, product, color: colornow, size: selectedSize, quantity: amount})
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            
            
        }
    };

    const handleSizeChange = (size) => {
        setAmount(1);
        const result = stocknow.find(
            item => item.v_size === size && item.v_color === colornow
        );
        //console.log(result.v_stock);
        setMaxAmount(result.v_stock);
        setSelectedSize(size);
    }
    const handle = async (nowColor) => {
        try {
            setAmount(1);
            const filtered = show.filter(item => item.v_color === nowColor);
            //console.log(filtered);
            setColornow(nowColor);
            setStocknow(filtered);
            const sizes = filtered.filter(item => item.v_stock !== 0).map(item => item.v_size);
            console.log(sizes);
            setGsize(sizes);
            if (selectedSize && !sizes.includes(selectedSize)) {
                setSelectedSize('');
            }

            //console.log(sizes);
            //console.log(color);

        } catch (err) {
            console.error("ERR:", err);
            setErrMsg('Please try again later');
        }
    }

    const handlePlus = () => {
        if (amount >= maxAmount) {
            return;
        }
        setAmount(amount + 1);
    }
    const handleMinus = () => {
        if (amount === 1) {
            return;
        }
        setAmount(amount - 1);
    }

    useEffect(() => {

        const getTitle = async () => {
            try {
                const res = await axios.post("http://localhost:3000/productVariant", { p });
                const res2 = await axios.post("http://localhost:3000/productVariant2", { p });
                setProductId(p);
                //console.log(res.data);
                //console.log(res2.data);
                setProduct(res.data);
                setShow(res2.data);
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
                    <div>Color:
                        {colornow === "" && checkColor && (
                            <span className="text-red-600"> Please select color</span>
                        )
                        }

                    </div>
                    <div className="ml-10 flex gap-x-10">
                        {product.map((rows) => (
                            <input value="red" name="choice"
                                className={`size-8 bg-${rows.v_color} cursor-pointer border-1 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3`}
                                onClick={() => handle(rows.v_color)}
                                type="radio">
                            </input>
                        ))}


                    </div>
                    <div>Size:
                        {selectedSize === "" && checkSize && (
                            <span className="text-red-600"> Please select size</span>
                        )
                        }
                    </div>
                    <div className="ml-10 flex gap-x-10">

                        {allSizes.map(size => (
                            <label
                                key={size}
                                className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                            >
                                <input
                                    name="size"
                                    type="radio"
                                    checked={selectedSize === size}
                                    onChange={() => handleSizeChange(size)}
                                    value={size}
                                    disabled={!gsize.includes(size)}
                                    className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed cursor-pointer"
                                />
                                <span className="text-sm font-medium uppercase group-has-checked:text-white">{size}</span>
                            </label>

                        ))}

                    </div>
                    <div>{product?.[0]?.p_showprice || 'Loading...'} THB</div>
                    <div className='flex ml-auto items-center'>
                        <button onClick={() => handleMinus()} className='cursor-pointer fix'><MinusIcon className='size-4' /></button>
                        <div className="w-25 flex justify-center">{amount}</div>
                        <button onClick={() => handlePlus()} className='cursor-pointer'><PlusIcon className='size-4' /></button>
                    </div>
                    <button onClick={addToCart} className="bg-indigo-600 text-white w-full md:max-w-75 p-3 rounded-md cursor-pointer">Add to cart</button>
                </div>

            </div>
            <div className="mt-10 sm:mt-auto">
                <Footer />
            </div>

        </div>

    )
}

export default Product;