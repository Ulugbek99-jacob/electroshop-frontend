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

    if (isLoading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>
                <div className="flex flex-col gap-4">
                    {data?.data.map((order: any) => (
                        <div key={order._id} className="bg-white rounded-lg shadow p-4">
                            <p className="text-gray-500 text-sm">ID: {order._id}</p>
                            <p className="text-blue-600 font-bold text-lg">Total: {order.totalAmount} $</p>
                            <p className="text-gray-700">Address: {order.shippingAddress}</p>
                            <div className="flex items-center gap-3 mt-3">
                                <span className="text-gray-700 font-semibold">Status:</span>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminOrders