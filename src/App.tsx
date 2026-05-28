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
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminProducts from "./pages/admin/AdminProducts"
import AdminOrders from "./pages/admin/AdminOrders"
import AdminProductCreate from "./pages/admin/AdminProductCreate"
import AdminProductEdit from "./pages/admin/AdminProductEdit"
import AdminCategories from "./pages/admin/AdminCategories"
import ChatBot from "./components/ChatBot"


const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
            <Navbar />
            <ChatBot />
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
                    <Route path="/admin/categories" element={
    <ProtectedRoute adminOnly>
        <AdminCategories />
    </ProtectedRoute>
} />
                    <Route path="/admin/products/edit/:id" element={
    <ProtectedRoute adminOnly>
        <AdminProductEdit />
    </ProtectedRoute>
} />
                    <Route path="/admin/products/create" element={
                    <ProtectedRoute adminOnly>
                    <AdminProductCreate />
                    </ProtectedRoute>
                      } />
                    <Route path="/admin" element={<ProtectedRoute adminOnly> <AdminDashboard /> </ProtectedRoute>} />
<Route path="/admin/products" element={
    <ProtectedRoute adminOnly>
        <AdminProducts />
    </ProtectedRoute>
} />
<Route path="/admin/orders" element={
    <ProtectedRoute adminOnly>
        <AdminOrders />
    </ProtectedRoute>
} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
    
}

export default App