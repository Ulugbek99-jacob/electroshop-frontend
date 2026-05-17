import { useQuery } from "@tanstack/react-query"
import api from "../../api/axios"

const AdminOrders = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-orders"],
        queryFn: () => api.get("/orders").then(res => res.data)
    })

    const handleStatusUpdate = async (id: string, status: string) => {
        await api.patch(`/orders/${id}`, { status })
        refetch()
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <h1>Orders</h1>
            {data?.data.map((order: any) => (
                <div key={order._id}>
                    <p>ID: {order._id}</p>
                    <p>Total: {order.totalAmount} $</p>
                    <p>Status: {order.status}</p>
                    <p>Address: {order.shippingAddress}</p>
                    <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            ))}
        </div>
    )
}

export default AdminOrders