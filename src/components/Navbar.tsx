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
        <nav>
            <Link to="/">Bosh sahifa</Link>
            <Link to="/products">Mahsulotlar</Link>
            <Link to="/cart">Savat ({items.length})</Link>
            {isAuthenticated ? (
                <>
                    <Link to="/orders">Buyurtmalar</Link>
                    <Link to="/profile">Profil</Link>
                    <button onClick={handleLogout}>Chiqish</button>
                </>
            ) : (
                <>
                    <Link to="/login">Kirish</Link>
                    <Link to="/register">Ro'yxatdan o'tish</Link>
                </>
            )}
        </nav>
    )
}

export default Navbar