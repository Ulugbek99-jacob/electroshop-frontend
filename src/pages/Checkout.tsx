import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { items, totalAmount, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await api.post("/orders", {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: address,
        totalAmount: totalAmount(),
      });
      clearCart();
      navigate("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "48px 24px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "32px" }}>Checkout</h1>

        {error && (
          <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA", color: "var(--red)", fontSize: "13px", marginBottom: "20px" }}>
            {error}
          </div>
        )}

        <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "28px", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Order Summary</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {items.map((item) => (
              <div key={item.product._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "var(--text-secondary)" }}>{item.product.name} × {item.quantity}</span>
                <span style={{ fontWeight: 600 }}>${(item.product.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div style={{ height: "1px", background: "var(--border)", marginBottom: "16px" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: "20px", fontWeight: 800 }}>${totalAmount().toLocaleString()}</span>
          </div>
        </div>

        <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "28px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Shipping</h2>
          <form onSubmit={handleOrder} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px" }}>ADDRESS</label>
              <input
                type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Seoul, Korea" required
                style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--bg)", fontSize: "14px", outline: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>
            <button
              type="submit" disabled={loading}
              style={{ padding: "13px", borderRadius: "10px", background: "var(--accent)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Placing order..." : "Place order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
