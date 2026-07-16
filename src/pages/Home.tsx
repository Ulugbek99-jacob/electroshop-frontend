import { useQuery } from "@tanstack/react-query"
import { getFeaturedProductsApi } from "../api/product.api"
import { useNavigate } from "react-router-dom"

const CATEGORIES = [
  { name: "Smartphones", slug: "smartphones", emoji: "📱", color: "#FFF3ED", border: "#FFD4B8" },
  { name: "Laptops", slug: "laptops", emoji: "💻", color: "#FFF8F0", border: "#FDDCB5" },
  { name: "Headphones", slug: "headphones", emoji: "🎧", color: "#FEF9ED", border: "#FCEABB" },
  { name: "Tablets", slug: "tablets", emoji: "🖥️", color: "#FFF0F0", border: "#FFCECE" },
  { name: "Cameras", slug: "cameras", emoji: "📷", color: "#F5F0FF", border: "#DDD0FF" },
  { name: "Smart Home", slug: "smart-home", emoji: "🏠", color: "#F0FAF4", border: "#B8E8C8" },
]

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProductsApi,
  })
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Hero */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px",
          alignItems: "center", padding: "72px 0 64px",
        }}>
          <div>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              color: "var(--accent)", textTransform: "uppercase",
              background: "var(--accent-light)", padding: "4px 12px", borderRadius: "20px",
              marginBottom: "20px",
            }}>
              ⚡ Premium Electronics
            </span>
            <h1 style={{
              fontSize: "52px", fontWeight: 800, lineHeight: 1.08,
              letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "20px",
            }}>
              Next-gen tech,<br />
              <span style={{ color: "var(--accent)" }}>delivered fast.</span>
            </h1>
            <p style={{
              fontSize: "16px", color: "var(--text-secondary)",
              lineHeight: 1.7, marginBottom: "32px", maxWidth: "440px",
            }}>
              Curated electronics from Apple, Samsung, Sony and more. Free shipping on orders over $50.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "13px 32px", borderRadius: "10px",
                  background: "var(--accent)", color: "#fff", border: "none",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(255,92,0,0.3)",
                }}
              >
                Shop now →
              </button>
              <button
                onClick={() => navigate("/products")}
                style={{
                  padding: "13px 24px", borderRadius: "10px",
                  background: "var(--surface)", color: "var(--text-secondary)",
                  border: "1px solid var(--border)", fontSize: "14px",
                  fontWeight: 500, cursor: "pointer",
                }}
              >
                View all
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: "32px", marginTop: "40px" }}>
              {[["10K+", "Happy customers"], ["500+", "Products"], ["Free", "Shipping $50+"]].map(([num, label]) => (
                <div key={label}>
                  <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{num}</p>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div style={{
            borderRadius: "24px", overflow: "hidden", position: "relative",
            height: "420px", background: "linear-gradient(135deg, #FFF3ED 0%, #FFE8D6 100%)",
            border: "1px solid #FFD4B8", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img
              src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Electronics"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", bottom: "20px", left: "20px", right: "20px",
              background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
              borderRadius: "14px", padding: "14px 18px",
              display: "flex", alignItems: "center", gap: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)", border: "1px solid rgba(255,255,255,0.8)",
            }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>📱</div>
              <div>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>iPhone 15 Pro</p>
                <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>From $999 · In stock</p>
              </div>
              <div style={{ marginLeft: "auto", padding: "6px 14px", borderRadius: "8px", background: "var(--accent)", color: "#fff", fontSize: "12px", fontWeight: 600 }}>
                Buy now
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Shop by Category</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "12px" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/products?category=${cat.slug}`)}
                style={{
                  padding: "20px 12px", borderRadius: "14px",
                  background: cat.color, border: `1px solid ${cat.border}`,
                  cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{cat.emoji}</div>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)" }}>{cat.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div style={{ paddingBottom: "80px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em" }}>Featured Products</h2>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>Hand-picked by our team</p>
            </div>
            <button
              onClick={() => navigate("/products")}
              style={{ background: "none", border: "none", color: "var(--accent)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}
            >
              See all →
            </button>
          </div>

          {isLoading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: "320px", borderRadius: "16px", background: "var(--border)", opacity: 0.5 }} />
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
              {data?.data?.map((product: any) => (
                <ProductCard key={product._id} product={product} onClick={() => navigate(`/products/${product.slug}`)} />
              ))}
            </div>
          )}
        </div>

        {/* Banner */}
        <div style={{
          marginBottom: "80px", borderRadius: "24px", padding: "48px",
          background: "linear-gradient(135deg, #CC4400 0%, #FF5C00 100%)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          overflow: "hidden", position: "relative",
        }}>
          <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", right: "60px", bottom: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Limited offer</p>
            <h3 style={{ fontSize: "32px", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "8px" }}>Up to 30% off<br />on headphones</h3>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>Premium audio experience at unbeatable prices</p>
          </div>
          <button
            onClick={() => navigate("/products")}
            style={{
              padding: "14px 32px", borderRadius: "12px",
              background: "#fff", color: "#CC4400", border: "none",
              fontSize: "14px", fontWeight: 700, cursor: "pointer",
              position: "relative", whiteSpace: "nowrap",
            }}
          >
            Shop headphones →
          </button>
        </div>
      </div>
    </div>
  )
}

export const ProductCard = ({ product, onClick }: { product: any; onClick: () => void }) => (
  <div
    onClick={onClick}
    style={{
      background: "var(--surface)", borderRadius: "16px",
      border: "1px solid var(--border)", overflow: "hidden",
      cursor: "pointer", transition: "all 0.2s",
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"
      ;(e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.1)"
      ;(e.currentTarget as HTMLElement).style.borderColor = "#FFD4B8"
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLElement).style.transform = "translateY(0)"
      ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
      ;(e.currentTarget as HTMLElement).style.borderColor = "var(--border)"
    }}
  >
    <div style={{ position: "relative", overflow: "hidden" }}>
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.name}
          style={{ width: "100%", height: "200px", objectFit: "cover", transition: "transform 0.3s" }}
        />
      ) : (
        <div style={{ width: "100%", height: "200px", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px" }}>
          📦
        </div>
      )}
      {product.isFeatured && (
        <span style={{
          position: "absolute", top: "12px", left: "12px",
          background: "var(--accent)", color: "#fff",
          fontSize: "10px", fontWeight: 700, padding: "3px 8px",
          borderRadius: "6px", letterSpacing: "0.05em",
        }}>
          FEATURED
        </span>
      )}
      {product.stock <= 5 && product.stock > 0 && (
        <span style={{
          position: "absolute", top: "12px", right: "12px",
          background: "#FEF2F2", color: "#DC2626",
          fontSize: "10px", fontWeight: 700, padding: "3px 8px",
          borderRadius: "6px",
        }}>
          Only {product.stock} left
        </span>
      )}
    </div>
    <div style={{ padding: "16px" }}>
      <p style={{ fontSize: "10px", color: "var(--accent)", fontWeight: 700, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {product.brand}
      </p>
      <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px", lineHeight: 1.3 }}>
        {product.name}
      </h3>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          ${product.price?.toLocaleString()}
        </p>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "var(--accent)", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#fff", fontSize: "16px",
        }}>
          +
        </div>
      </div>
    </div>
  </div>
)

export default Home
