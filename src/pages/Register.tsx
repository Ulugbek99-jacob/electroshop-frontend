import { useState } from "react";
import { registerApi } from "../api/auth.api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await registerApi({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: "8px",
    border: "1px solid var(--border)", background: "var(--bg)",
    fontSize: "14px", color: "var(--text-primary)", outline: "none",
    transition: "border-color 0.15s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "8px" }}>Create account</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Join ElectroShop today</p>
        </div>

        <div style={{ background: "var(--surface)", borderRadius: "20px", border: "1px solid var(--border)", padding: "32px" }}>
          {error && (
            <div style={{ padding: "12px 16px", borderRadius: "8px", background: "#FEF2F2", border: "1px solid #FECACA", color: "var(--red)", fontSize: "13px", marginBottom: "20px" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "FULL NAME", value: name, setter: setName, type: "text", placeholder: "John Doe" },
              { label: "EMAIL", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
              { label: "PASSWORD", value: password, setter: setPassword, type: "password", placeholder: "Min. 6 characters" },
            ].map(({ label, value, setter, type, placeholder }) => (
              <div key={label}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "6px", letterSpacing: "0.02em" }}>{label}</label>
                <input
                  type={type} value={value} placeholder={placeholder} required
                  onChange={(e) => setter(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--blue)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

            <button
              type="submit" disabled={loading}
              style={{ padding: "12px", borderRadius: "10px", background: "var(--accent)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "4px" }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px", color: "var(--text-secondary)", fontSize: "13px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--blue)", fontWeight: 500, textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
