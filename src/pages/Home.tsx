import { useQuery } from "@tanstack/react-query"
import { getFeaturedProductsApi } from "../api/product.api"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["featured-products"],
        queryFn: getFeaturedProductsApi
    })
    const navigate = useNavigate()

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            {/* Hero */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '80px 24px 64px',
            }}>
                <div style={{ maxWidth: '600px', marginBottom: '80px' }}>
                    <span style={{
                        display: 'inline-block',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        color: 'var(--blue)',
                        textTransform: 'uppercase',
                        marginBottom: '20px',
                    }}>
                        Premium Electronics
                    </span>
                    <h1 style={{
                        fontSize: '56px',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.03em',
                        color: 'var(--text-primary)',
                        marginBottom: '20px',
                    }}>
                        Tech that moves<br />
                        <span style={{ color: 'var(--blue)' }}>with you.</span>
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.7,
                        marginBottom: '32px',
                    }}>
                        Curated electronics from the world's leading brands. Fast shipping, easy returns.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '10px',
                                background: 'var(--accent)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                letterSpacing: '-0.01em',
                            }}
                        >
                            Shop now
                        </button>
                        <button
                            onClick={() => navigate('/products')}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '10px',
                                background: 'transparent',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border)',
                                fontSize: '14px',
                                fontWeight: 500,
                                cursor: 'pointer',
                            }}
                        >
                            View all
                        </button>
                    </div>
                </div>

                {/* Featured */}
                <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                    }}>
                        Featured
                    </h2>
                    <button
                        onClick={() => navigate('/products')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--blue)',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                        }}
                    >
                        See all →
                    </button>
                </div>

                {isLoading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        {[1,2,3].map(i => (
                            <div key={i} style={{
                                height: '320px',
                                borderRadius: '16px',
                                background: 'var(--border)',
                                animation: 'pulse 1.5s infinite',
                            }} />
                        ))}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '16px',
                    }}>
                        {data?.data.map((product: any) => (
                            <ProductCard key={product._id} product={product} onClick={() => navigate(`/products/${product.slug}`)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

const ProductCard = ({ product, onClick }: { product: any; onClick: () => void }) => (
    <div
        onClick={onClick}
        style={{
            background: 'var(--surface)',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
        }}
        onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
        }}
    >
        {product.images?.[0] ? (
            <img
                src={product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
        ) : (
            <div style={{
                width: '100%',
                height: '200px',
                background: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
            }}>📦</div>
        )}
        <div style={{ padding: '16px' }}>
            <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {product.brand}
            </p>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                {product.name}
            </h3>
            <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                ${product.price.toLocaleString()}
            </p>
        </div>
    </div>
)

export default Home
export { ProductCard }
