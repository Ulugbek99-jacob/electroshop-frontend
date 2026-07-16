import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProductsApi } from "../api/product.api"
import { useNavigate } from "react-router-dom"
import { ProductCard } from "./Home"

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "📱 Smartphones", value: "smartphones" },
  { label: "💻 Laptops", value: "laptops" },
  { label: "🎧 Headphones", value: "headphones" },
  { label: "🖥️ Tablets", value: "tablets" },
  { label: "📷 Cameras", value: "cameras" },
  { label: "🏠 Smart Home", value: "smart-home" },
]

const SORTS = [
  { label: "Newest", value: "" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
]

const Products = () => {
  const [category, setCategory] = useState("")
  const [sort, setSort] = useState("")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category, sort, search],
    queryFn: () => getProductsApi({ category, sort, search }),
  })

  const products = data?.data ?? []

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "4px" }}>All Products</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
            {isLoading ? "Loading..." : `${products.length} products found`}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "11px 14px 11px 40px",
              borderRadius: "10px", border: "1px solid var(--border)",
              background: "var(--surface)", fontSize: "14px",
              color: "var(--text-primary)", outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Filters row */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                style={{
                  padding: "7px 14px", borderRadius: "8px", border: "1.5px solid",
                  borderColor: category === cat.value ? "var(--accent)" : "var(--border)",
                  background: category === cat.value ? "var(--accent-light)" : "var(--surface)",
                  color: category === cat.value ? "var(--accent)" : "var(--text-secondary)",
                  fontSize: "13px", fontWeight: category === cat.value ? 600 : 400,
                  cursor: "pointer", whiteSpace: "nowrap",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              padding: "7px 14px", borderRadius: "8px",
              border: "1.5px solid var(--border)", background: "var(--surface)",
              fontSize: "13px", color: "var(--text-secondary)", cursor: "pointer", outline: "none",
            }}
          >
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Error */}
        {isError && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-secondary)" }}>
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>⚠️</p>
            <p>Something went wrong. Please try again.</p>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {[1, 2, 3, 4, 5, 6, 8].map(i => (
              <div key={i} style={{ height: "300px", borderRadius: "16px", background: "var(--border)", opacity: 0.5 }} />
            ))}
          </div>
        )}

        {/* Products grid */}
        {!isLoading && !isError && products.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} onClick={() => navigate(`/products/${product.slug}`)} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>No products found.</p>
            <button
              onClick={() => { setCategory(""); setSearch("") }}
              style={{ padding: "10px 24px", borderRadius: "8px", background: "var(--accent)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 500 }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
