import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { getProductBySlugApi } from "../api/product.api"
import { useCartStore } from "../store/cartStore"

const ProductDetail = () => {
    const { slug } = useParams()
    const { addItem } = useCartStore()
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", slug],
        queryFn: () => getProductBySlugApi(slug as string)
    })

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    )

    if (isError) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--red)' }}>Product not found.</p>
        </div>
    )

    const product = data?.data

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
                {/* Breadcrumb */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '32px' }}>
                    <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '13px' }}>Home</button>
                    <span style={{ color: 'var(--text-tertiary)' }}>/</span>
                    <button onClick={() => navigate('/products')} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '13px' }}>Products</button>
                    <span style={{ color: 'var(--text-tertiary)' }}>/</span>
                    <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500 }}>{product?.name}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
                    {/* Image */}
                    <div style={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        aspectRatio: '1',
                    }}>
                        {product?.images?.[0] ? (
                            <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px' }}>📦</div>
                        )}
                    </div>

                    {/* Info */}
                    <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--blue)', textTransform: 'uppercase' }}>
                            {product?.brand}
                        </span>
                        <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)', margin: '8px 0 16px', lineHeight: 1.2 }}>
                            {product?.name}
                        </h1>
                        <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px' }}>
                            ${product?.price?.toLocaleString()}
                        </p>

                        <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                            {product?.description}
                        </p>

                        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                            <div style={{ padding: '12px 20px', borderRadius: '10px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Stock</p>
                                <p style={{ fontSize: '15px', fontWeight: 600, color: product?.stock > 0 ? 'var(--green)' : 'var(--red)' }}>
                                    {product?.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => { addItem(product); navigate("/cart") }}
                            disabled={product?.stock === 0}
                            style={{
                                width: '100%',
                                padding: '14px',
                                borderRadius: '12px',
                                background: product?.stock === 0 ? 'var(--border)' : 'var(--accent)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '15px',
                                fontWeight: 600,
                                cursor: product?.stock === 0 ? 'not-allowed' : 'pointer',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            {product?.stock === 0 ? 'Out of stock' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
