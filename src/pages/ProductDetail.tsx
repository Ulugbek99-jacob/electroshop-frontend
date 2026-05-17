import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { getProductBySlugApi } from "../api/product.api"
import { useCartStore } from "../store/cartStore"

const ProductDetail = () => {
    const { slug } = useParams()
    const { addItem } = useCartStore()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProductBySlugApi(slug as string)
    })

    if (isLoading) return <p className="text-center mt-10">Loading...</p>
    if (isError) return <p className="text-center mt-10 text-red-500">Something went wrong</p>

    const product = data?.data

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-8">
                    {product?.images?.[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-full md:w-80 h-80 object-cover rounded" />
                    )}
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-bold text-gray-800">{product?.name}</h1>
                        <p className="text-3xl font-bold text-blue-600">{product?.price} $</p>
                        <p className="text-gray-600">{product?.description}</p>
                        <p className="text-gray-500">Brand: <span className="font-semibold">{product?.brand}</span></p>
                        <p className="text-gray-500">Stock: <span className="font-semibold">{product?.stock}</span></p>
                        <button
                            onClick={() => {
                                addItem(product)
                                navigate("/cart")
                            }}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded font-semibold"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail