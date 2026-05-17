import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Admin Panel</h1>
            <button onClick={() => navigate("/admin/products")}>
                Products
            </button>
            <button onClick={() => navigate("/admin/orders")}>
                Orders
            </button>
            <button onClick={() => navigate("/admin/categories")}>
                Categories
            </button>
        </div>
    )
}

export default AdminDashboard