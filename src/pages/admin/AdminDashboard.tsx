import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-8 rounded-lg text-xl font-semibold shadow"
                    >
                        Products
                    </button>
                    <button
                        onClick={() => navigate("/admin/orders")}
                        className="bg-green-500 hover:bg-green-600 text-white py-8 rounded-lg text-xl font-semibold shadow"
                    >
                        Orders
                    </button>
                    <button
                        onClick={() => navigate("/admin/categories")}
                        className="bg-purple-500 hover:bg-purple-600 text-white py-8 rounded-lg text-xl font-semibold shadow"
                    >
                        Categories
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard