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
        <div>
            <h1>Electroshop</h1>
            <h2>Tavsiya etilgan mahsulotlar</h2>
            {isLoading && <p>Yuklanmoqda...</p>}
            {data?.data.map((product: any) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.price} $</p>
                    <button onClick={() => navigate(`/products/${product.slug}`)}>
                        Ko'rish
                    </button>
                </div>
            ))}
        </div>
    )
}

export default Home