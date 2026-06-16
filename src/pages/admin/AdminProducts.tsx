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
        if (confirm("Delete this product?")) {
            await api.delete(`/products/${id}`)
            refetch()
        }
    }

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Admin</p>
                        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>Products</h1>
                    </div>
                    <button
                        onClick={() => navigate("/admin/products/create")}
                        style={{ padding: '10px 20px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        + Add product
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data?.data.map((product: any) => (
                        <div key={product._id} style={{
                            background: 'var(--surface)',
                            borderRadius: '14px',
                            border: '1px solid var(--border)',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            {product.images?.[0] ? (
                                <img src={product.images[0]} alt={product.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border)' }} />
                            ) : (
                                <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📦</div>
                            )}

                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{product.name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{product.brand} · Stock: {product.stock}</p>
                            </div>

                            <p style={{ fontSize: '16px', fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
                                ${product.price?.toLocaleString()}
                            </p>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                    style={{ padding: '7px 14px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-primary)' }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    style={{ padding: '7px 14px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--red)' }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminProducts
