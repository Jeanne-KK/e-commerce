import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import History from "./pages/History";
import OrderHistory from "./pages/OrderHistory";
import CheckProduct from "./pages/CheckProduct";
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/history" element={<History />} />
        <Route path="/order" element={<OrderHistory />} />
        <Route path="/checkProduct" element={<CheckProduct />} />
      </Routes>
    </BrowserRouter>
      
  )
}

export default App
