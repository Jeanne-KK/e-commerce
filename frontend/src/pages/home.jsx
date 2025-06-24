import Header from "../components/header";
import Shirt from "../assets/shirt.png";



function Home(){
    return (
        <div className="font-roboto">
            <div><Header /></div>
            <div className="ml-5 mr-5 md:mr-50 md:ml-50 md:pl-15 md:pr-15 lg:pt-15 bg-white">
                <h2 className="text-3xl font-bold">Product</h2>
                <div className="grid grid-cols-4 justify-between gap-x-10 mt-5">
                    <div className="">
                        <img src={Shirt} className="w-full hover:opacity-50" /> 
                        <div className="flex">
                            <div>Shirt</div>
                            <div className="ml-auto">35$</div>
                        </div>
                        <div>
                            Black
                        </div>
                    </div>
                    <div className="">
                        <img src={Shirt} className="w-full hover:opacity-50" /> 
                        <div className="flex">
                            <div>Shirt</div>
                            <div className="ml-auto">35$</div>
                        </div>
                        <div>
                            Black
                        </div>
                    </div>
                    <div className="">
                        <img src={Shirt} className="w-full hover:opacity-50" /> 
                        <div className="flex">
                            <div>Shirt</div>
                            <div className="ml-auto">35$</div>
                        </div>
                        <div>
                            Black
                        </div>
                    </div>
                    <div className="">
                        <img src={Shirt} className="w-full hover:opacity-50" /> 
                        <div className="flex">
                            <div>Shirt</div>
                            <div className="ml-auto">35$</div>
                        </div>
                        <div>
                            Black
                        </div>
                    </div>
                    <div className="">
                        <img src={Shirt} className="w-full hover:opacity-50" /> 
                        <div className="flex">
                            <div>Shirt</div>
                            <div className="ml-auto">35$</div>
                        </div>
                        <div>
                            Black
                        </div>
                    </div>
                    
                </div>
            </div>
            
            
        </div>
    )
}

export default Home