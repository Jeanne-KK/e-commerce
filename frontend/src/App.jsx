import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Checkout from "./pages/Checkout";
import History from "./pages/History";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
