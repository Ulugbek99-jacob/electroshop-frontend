import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getProductBySlugApi } from "../api/product.api"

const ProductDetail = () => {
    const { slug } = useParams()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProductBySlugApi(slug as string)
    })

    if (isLoading) return <p>Yuklanmoqda...</p>
    if (isError) return <p>Xato yuz berdi</p>

    const product = data?.data

    return (
        <div>
            <h1>{product?.name}</h1>
            <p>{product?.price} $</p>
            <p>{product?.description}</p>
            <p>Brand: {product?.brand}</p>
            <p>Stock: {product?.stock}</p>
        </div>
    )
}

export default ProductDetail