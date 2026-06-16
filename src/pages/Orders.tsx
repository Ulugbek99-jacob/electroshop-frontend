import { useQuery } from "@tanstack/react-query"
import api from "../api/axios"

const statusColors: Record<string, string> = {
    pending: '#CA8A04',
    confirmed: '#2563EB',
    shipped: '#7C3AED',
    delivered: '#16A34A',
    cancelled: '#DC2626',
}

const Orders = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["my-orders"],
        queryFn: () => api.get("/orders/my-orders").then(res => res.data)
    })

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading orders...</p>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '32px' }}>My Orders</h1>

                {(!data?.data || data.data.length === 0) ? (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
                        <p style={{ color: 'var(--text-secondary)' }}>No orders yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {data.data.map((order: any) => (
                            <div key={order._id} style={{
                                background: 'var(--surface)',
                                borderRadius: '16px',
                                border: '1px solid var(--border)',
                                padding: '20px 24px',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px', fontFamily: 'monospace' }}>
                                            #{order._id.slice(-8).toUpperCase()}
                                        </p>
                                        <p style={{ fontSize: '20px', fontWeight: 700 }}>${order.totalAmount?.toLocaleString()}</p>
                                    </div>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: 600,
                                        background: `${statusColors[order.status]}18`,
                                        color: statusColors[order.status] || 'var(--text-secondary)',
                                        textTransform: 'capitalize',
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                                    📍 {order.shippingAddress}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders
