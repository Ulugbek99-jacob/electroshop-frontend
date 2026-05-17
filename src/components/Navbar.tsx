import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

const Navbar = () => {
    const { isAuthenticated, logout } = useAuthStore()
    const { items } = useCartStore()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-400">ElectroShop</Link>
            
            <div className="flex gap-6 items-center">
                <Link to="/products" className="hover:text-blue-400">Products</Link>
                <Link to="/cart" className="hover:text-blue-400">Cart ({items.length})</Link>
                
                {isAuthenticated ? (
                    <>
                        <Link to="/orders" className="hover:text-blue-400">Orders</Link>
                        <Link to="/profile" className="hover:text-blue-400">Profile</Link>
                        <button 
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-400">Login</Link>
                        <Link to="/register" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar