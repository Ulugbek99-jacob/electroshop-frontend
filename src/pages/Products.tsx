import { useQuery } from "@tanstack/react-query"
import { getProductsApi } from "../api/product.api"

const Products = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProductsApi()
    })

    if (isLoading) return <p>Yuklanmoqda...</p>
    if (isError) return <p>Xato yuz berdi</p>

    return (
        <div>
            <h1>Mahsulotlar</h1>
            {data?.data.map((product: any) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.price} $</p>
                </div>
            ))}
        </div>
    )
}

export default Products