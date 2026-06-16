import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
    const navigate = useNavigate()

    const cards = [
        { label: 'Products', icon: '📦', path: '/admin/products', color: '#2563EB', bg: '#EFF6FF' },
        { label: 'Orders', icon: '🛍️', path: '/admin/orders', color: '#16A34A', bg: '#F0FDF4' },
        { label: 'Categories', icon: '🗂️', path: '/admin/categories', color: '#7C3AED', bg: '#F5F3FF' },
    ]

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                        Admin
                    </span>
                    <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '4px' }}>
                        Dashboard
                    </h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {cards.map(card => (
                        <button
                            key={card.label}
                            onClick={() => navigate(card.path)}
                            style={{
                                background: 'var(--surface)',
                                border: '1px solid var(--border)',
                                borderRadius: '20px',
                                padding: '32px 24px',
                                cursor: 'pointer',
                                textAlign: 'left',
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
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '12px',
                                background: card.bg, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontSize: '24px', marginBottom: '16px',
                            }}>
                                {card.icon}
                            </div>
                            <p style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {card.label}
                            </p>
                            <p style={{ fontSize: '12px', color: card.color, fontWeight: 500 }}>
                                Manage →
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
