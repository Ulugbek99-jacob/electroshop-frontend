import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"

const Orders = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["my-orders"],
        queryFn: () => api.get("/orders/my-orders").then(res => res.data)
    })

    if (isLoading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
                <div className="flex flex-col gap-4">
                    {data?.data.map((order: any) => (
                        <div key={order._id} className="bg-white rounded-lg shadow p-4">
                            <p className="text-gray-500 text-sm">Order ID: {order._id}</p>
                            <p className="text-blue-600 font-bold text-lg">Total: {order.totalAmount} $</p>
                            <p className="text-gray-700">Status: <span className="font-semibold capitalize">{order.status}</span></p>
                            <p className="text-gray-500">Address: {order.shippingAddress}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders