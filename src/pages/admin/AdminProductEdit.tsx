import { useState, useEffect } from "react"
import api from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--bg)',
    fontSize: '14px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
}

const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
}

const AdminProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ name: "", description: "", price: 0, stock: 0, brand: "" })

    useEffect(() => {
        api.get(`/products/${id}`).then(res => {
            const p = res.data.data
            setForm({ name: p.name, description: p.description, price: p.price, stock: p.stock, brand: p.brand })
            setImageUrl(p.images?.[0] || "")
        })
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const formData = new FormData()
        formData.append("image", file)
        const response = await api.post("/uploads", formData, { headers: { "Content-Type": "multipart/form-data" } })
        setImageUrl(response.data.url)
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.put(`/products/${id}`, { ...form, price: Number(form.price), stock: Number(form.stock), images: [imageUrl] })
            navigate("/admin/products")
        } catch {
            alert("Error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <button onClick={() => navigate('/admin/products')} style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', fontSize: '13px', padding: 0, marginBottom: '8px' }}>
                        ← Back to products
                    </button>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>Edit Product</h1>
                </div>

                <div style={{ background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)', padding: '28px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {[
                            { name: 'name', label: 'Name', type: 'text' },
                            { name: 'brand', label: 'Brand', type: 'text' },
                            { name: 'price', label: 'Price ($)', type: 'number' },
                            { name: 'stock', label: 'Stock', type: 'number' },
                        ].map(field => (
                            <div key={field.name}>
                                <label style={labelStyle}>{field.label}</label>
                                <input
                                    name={field.name}
                                    type={field.type}
                                    value={(form as any)[field.name]}
                                    onChange={handleChange}
                                    style={inputStyle}
                                    onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>
                        ))}

                        <div>
                            <label style={labelStyle}>Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                style={{ ...inputStyle, resize: 'vertical' }}
                                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Image</label>
                            {imageUrl && (
                                <img src={imageUrl} alt="current" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px', border: '1px solid var(--border)' }} />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ ...inputStyle, cursor: 'pointer' }}
                            />
                            {uploading && <p style={{ fontSize: '12px', color: 'var(--blue)', marginTop: '6px' }}>Uploading...</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ padding: '12px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProductEdit
