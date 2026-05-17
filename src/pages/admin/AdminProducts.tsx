import { useQuery } from "@tanstack/react-query"
import { getProductsApi } from "../../api/product.api"
import { useNavigate } from "react-router-dom"
import api from "../../api/axios"

const AdminProducts = () => {
    const navigate = useNavigate()
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-products"],
        queryFn: () => getProductsApi()
    })

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await api.delete(`/products/${id}`)
            refetch()
        }
    }

    if (isLoading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <button
                        onClick={() => navigate("/admin/products/create")}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
                    >
                        Add Product
                    </button>
                </div>
                <div className="flex flex-col gap-4">
                    {data?.data.map((product: any) => (
                        <div key={product._id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {product.images?.[0] && (
                                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-blue-600 font-bold">{product.price} $</p>
                                    <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminProducts