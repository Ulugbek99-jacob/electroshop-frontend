import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"

const Orders = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["my-orders"],
        queryFn: () => api.get("/orders/my-orders").then(res => res.data)
    })

    if (isLoading) return <p>Yuklanmoqda...</p>

    return (
        <div>
            <h1>Mening buyurtmalarim</h1>
            {data?.data.map((order: any) => (
                <div key={order._id}>
                    <p>Buyurtma ID: {order._id}</p>
                    <p>Jami: {order.totalAmount} $</p>
                    <p>Holat: {order.status}</p>
                    <p>Manzil: {order.shippingAddress}</p>
                </div>
            ))}
        </div>
    )
}

export default Orders