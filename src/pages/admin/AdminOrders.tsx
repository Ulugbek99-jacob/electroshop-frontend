import { useQuery } from "@tanstack/react-query"
import api from "../../api/axios"

const statusColors: Record<string, string> = {
    pending: '#CA8A04',
    confirmed: '#2563EB',
    shipped: '#7C3AED',
    delivered: '#16A34A',
    cancelled: '#DC2626',
}

const AdminOrders = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-orders"],
        queryFn: () => api.get("/orders").then(res => res.data)
    })

    const handleStatusUpdate = async (id: string, status: string) => {
        await api.patch(`/orders/${id}`, { status })
        refetch()
    }

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Admin</p>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>Orders</h1>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data?.data.map((order: any) => (
                        <div key={order._id} style={{
                            background: 'var(--surface)',
                            borderRadius: '14px',
                            border: '1px solid var(--border)',
                            padding: '18px 24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                        }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace', marginBottom: '4px' }}>
                                    #{order._id.slice(-8).toUpperCase()}
                                </p>
                                <p style={{ fontSize: '15px', fontWeight: 700 }}>${order.totalAmount?.toLocaleString()}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{order.shippingAddress}</p>
                            </div>

                            <select
                                value={order.status}
                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                style={{
                                    padding: '7px 12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    background: `${statusColors[order.status]}18`,
                                    color: statusColors[order.status],
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    outline: 'none',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => (
                                    <option key={s} value={s} style={{ background: '#fff', color: '#000' }}>{s}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminOrders
