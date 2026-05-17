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
        if (confirm("O'chirishni tasdiqlaysizmi?")) {
            await api.delete(`/products/${id}`)
            refetch()
        }
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <h1>Products</h1>
            <button onClick={() => navigate("/admin/products/create")}>
                Add Product
            </button>
            {data?.data.map((product: any) => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.price} $</p>
                    <p>Stock: {product.stock}</p>
                    <button onClick={() => navigate(`/admin/products/edit/${product._id}`)}>
                        Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    )
}

export default AdminProducts