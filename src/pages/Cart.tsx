import { useCartStore } from "../store/cartStore"
import { useNavigate } from "react-router-dom"

const Cart = () => {
    const { items, removeItem, increaseQuantity, decreaseQuantity, totalAmount } = useCartStore()
    const navigate = useNavigate()

    if (items.length === 0) {
        return (
            <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <p style={{ fontSize: '48px' }}>🛒</p>
                <h2 style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.02em' }}>Your cart is empty</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Add some products to get started.</p>
                <button
                    onClick={() => navigate("/products")}
                    style={{ padding: '10px 24px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', marginTop: '8px' }}
                >
                    Browse products
                </button>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '32px' }}>
                    Cart <span style={{ color: 'var(--text-tertiary)', fontWeight: 400, fontSize: '20px' }}>({items.length})</span>
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {items.map((item) => (
                        <div key={item.product._id} style={{
                            background: 'var(--surface)',
                            borderRadius: '16px',
                            border: '1px solid var(--border)',
                            padding: '16px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                        }}>
                            {item.product.images?.[0] ? (
                                <img src={item.product.images[0]} alt={item.product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border)' }} />
                            ) : (
                                <div style={{ width: '64px', height: '64px', borderRadius: '10px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📦</div>
                            )}

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{item.product.name}</h3>
                                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.product.brand}</p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <button onClick={() => decreaseQuantity(item.product._id)} style={qtyBtn}>−</button>
                                <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item.product._id)} style={qtyBtn}>+</button>
                            </div>

                            <p style={{ fontSize: '15px', fontWeight: 700, minWidth: '80px', textAlign: 'right' }}>
                                ${(item.product.price * item.quantity).toLocaleString()}
                            </p>

                            <button
                                onClick={() => removeItem(item.product._id)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '18px', padding: '4px' }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{
                    background: 'var(--surface)',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Total</p>
                        <p style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>${totalAmount().toLocaleString()}</p>
                    </div>
                    <button
                        onClick={() => navigate("/checkout")}
                        style={{ padding: '12px 28px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Checkout →
                    </button>
                </div>
            </div>
        </div>
    )
}

const qtyBtn: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    color: 'var(--text-primary)',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export default Cart
