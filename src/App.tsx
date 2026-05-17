import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Navbar from "./components/Navbar"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element= {<Cart />} />
                    <Route path="/checkout" element= {<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/profile" element= {<Profile />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App