import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Checkout from "./pages/Checkout";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
