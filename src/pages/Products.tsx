import { useQuery } from "@tanstack/react-query"
import { getProductsApi } from "../api/product.api"
import { useNavigate } from "react-router-dom"
import { ProductCard } from "./Home"

const Products = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProductsApi()
    })
    const navigate = useNavigate()

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)', marginBottom: '8px' }}>
                        All Products
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {data?.data?.length || 0} items
                    </p>
                </div>

                {isLoading && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} style={{ height: '320px', borderRadius: '16px', background: 'var(--border)' }} />
                        ))}
                    </div>
                )}

                {isError && (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
                        <p style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</p>
                        <p>Something went wrong. Please try again.</p>
                    </div>
                )}

                {!isLoading && !isError && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '16px',
                    }}>
                        {data?.data.map((product: any) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onClick={() => navigate(`/products/${product.slug}`)}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && !isError && data?.data?.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '80px 0' }}>
                        <p style={{ fontSize: '40px', marginBottom: '16px' }}>📦</p>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>No products yet.</p>
                        <button
                            onClick={() => navigate('/')}
                            style={{ padding: '10px 24px', borderRadius: '8px', background: 'var(--accent)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                        >
                            Go home
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
