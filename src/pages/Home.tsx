import { useQuery } from "@tanstack/react-query"
import { getFeaturedProductsApi } from "../api/product.api"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["featured-products"],
        queryFn: getFeaturedProductsApi
    })
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">ElectroShop</h1>
                <h2 className="text-xl font-semibold text-gray-700 mb-6">Featured Products</h2>
                {isLoading && <p>Loading...</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data?.data.map((product: any) => (
                        <div key={product._id} className="bg-white rounded-lg shadow p-4">
                            {product.images?.[0] && (
                                <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover rounded mb-3" />
                            )}
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-blue-600 font-bold">{product.price} $</p>
                            <button
                                onClick={() => navigate(`/products/${product.slug}`)}
                                className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                            >
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home