import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuthStore()
  const { items } = useCartStore()
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <nav style={{
      background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto", padding: "0 24px",
        height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "8px",
            background: "var(--accent)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "16px",
          }}>⚡</div>
          <span style={{ fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
            Electro<span style={{ color: "var(--accent)" }}>Shop</span>
          </span>
        </Link>

        {/* Center nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {[{ to: "/", label: "Home" }, { to: "/products", label: "Products" }].map(({ to, label }) => (
            <Link key={to} to={to} style={{
              padding: "6px 14px", borderRadius: "8px", textDecoration: "none",
              fontSize: "13px", fontWeight: isActive(to) ? 600 : 400,
              color: isActive(to) ? "var(--text-primary)" : "var(--text-secondary)",
              background: isActive(to) ? "var(--bg)" : "transparent",
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <Link to="/admin" style={{
                  padding: "6px 14px", borderRadius: "8px", textDecoration: "none",
                  fontSize: "13px", fontWeight: 500, color: "var(--accent)",
                  background: "var(--accent-light)", border: "1px solid var(--accent-border)",
                }}>
                  Admin
                </Link>
              )}
              <Link to="/orders" style={{
                padding: "6px 14px", borderRadius: "8px", textDecoration: "none",
                fontSize: "13px", color: "var(--text-secondary)",
                background: isActive("/orders") ? "var(--bg)" : "transparent",
                fontWeight: isActive("/orders") ? 600 : 400,
              }}>
                Orders
              </Link>
              <Link to="/profile" style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "var(--accent)", color: "#fff", textDecoration: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700,
              }}>
                {user?.name?.[0]?.toUpperCase()}
              </Link>
              <Link to="/cart" style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "8px",
                background: "var(--text-primary)", color: "#fff",
                textDecoration: "none", fontSize: "13px", fontWeight: 600,
                position: "relative",
              }}>
                🛒 Cart
                {items.length > 0 && (
                  <span style={{
                    background: "#EF4444", color: "#fff", borderRadius: "50%",
                    width: "18px", height: "18px", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "10px", fontWeight: 700,
                  }}>
                    {items.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => { logout(); navigate("/login") }}
                style={{
                  padding: "8px 14px", borderRadius: "8px",
                  border: "1px solid var(--border)", background: "transparent",
                  color: "var(--text-secondary)", fontSize: "13px", cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                padding: "8px 16px", borderRadius: "8px", textDecoration: "none",
                fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)",
                border: "1px solid var(--border)",
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                padding: "8px 18px", borderRadius: "8px",
                background: "var(--accent)", color: "#fff", textDecoration: "none",
                fontSize: "13px", fontWeight: 600,
                boxShadow: "0 2px 8px rgba(255,92,0,0.3)",
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

export default Navbar
