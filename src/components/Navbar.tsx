import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuthStore()
    const { items } = useCartStore()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const isActive = (path: string) => location.pathname === path

    return (
        <nav style={{
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 24px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link to="/" style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 800,
                    fontSize: '20px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    letterSpacing: '-0.03em',
                }}>
                    ELECTRO<span style={{ color: 'var(--blue)' }}>SHOP</span>
                </Link>

                {/* Nav Links */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <NavLink to="/products" active={isActive('/products')}>Products</NavLink>

                    {isAuthenticated ? (
                        <>
                            <NavLink to="/orders" active={isActive('/orders')}>Orders</NavLink>
                            <NavLink to="/profile" active={isActive('/profile')}>Profile</NavLink>
                            {user?.role === 'admin' && (
                                <NavLink to="/admin" active={location.pathname.startsWith('/admin')}>Admin</NavLink>
                            )}
                            <Link to="/cart" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                background: 'var(--accent)',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                            }}>
                                Cart
                                {items.length > 0 && (
                                    <span style={{
                                        background: 'var(--blue)',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '11px',
                                        fontWeight: 600,
                                    }}>{items.length}</span>
                                )}
                            </Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: '6px 14px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    background: 'transparent',
                                    color: 'var(--text-secondary)',
                                    fontSize: '13px',
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" active={isActive('/login')}>Login</NavLink>
                            <Link to="/register" style={{
                                padding: '6px 16px',
                                borderRadius: '8px',
                                background: 'var(--accent)',
                                color: '#fff',
                                textDecoration: 'none',
                                fontSize: '13px',
                                fontWeight: 500,
                            }}>
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

const NavLink = ({ to, children, active }: { to: string; children: React.ReactNode; active: boolean }) => (
    <Link to={to} style={{
        padding: '6px 12px',
        borderRadius: '8px',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: active ? 600 : 400,
        background: active ? 'var(--bg)' : 'transparent',
    }}>
        {children}
    </Link>
)

export default Navbar
