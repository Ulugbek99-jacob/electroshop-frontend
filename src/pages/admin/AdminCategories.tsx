import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import api from "../../api/axios"

const AdminCategories = () => {
    const [form, setForm] = useState({ name: "", slug: "", description: "" })
    const [imageUrl, setImageUrl] = useState("")
    const [uploading, setUploading] = useState(false)

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-categories"],
        queryFn: () => api.get("/category").then(res => res.data)
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/category", { ...form, image: imageUrl })
            refetch()
            setForm({ name: "", slug: "", description: "" })
            setImageUrl("")
        } catch {
            alert("Error occurred")
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Delete this category?")) {
            await api.delete(`/category/${id}`)
            refetch()
        }
    }

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

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    )

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
                <div style={{ marginBottom: '32px' }}>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Admin</p>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.03em' }}>Categories</h1>
                </div>

                {/* Add form */}
                <div style={{ background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)', padding: '28px', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '20px' }}>Add Category</h2>
                    <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { name: 'name', placeholder: 'Smartphones' },
                            { name: 'slug', placeholder: 'smartphones' },
                            { name: 'description', placeholder: 'Description (optional)' },
                        ].map(field => (
                            <input
                                key={field.name}
                                name={field.name}
                                value={(form as any)[field.name]}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                style={inputStyle}
                                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                                onBlur={e => e.target.style.borderColor = 'var(--border)'}
                            />
                        ))}
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...inputStyle, cursor: 'pointer' }} />
                        {uploading && <p style={{ fontSize: '12px', color: 'var(--blue)' }}>Uploading...</p>}
                        {imageUrl && <img src={imageUrl} alt="preview" style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border)' }} />}
                        <button type="submit" style={{ padding: '11px', borderRadius: '10px', background: 'var(--accent)', color: '#fff', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                            Create category
                        </button>
                    </form>
                </div>

                {/* List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {data?.data.map((category: any) => (
                        <div key={category._id} style={{
                            background: 'var(--surface)',
                            borderRadius: '14px',
                            border: '1px solid var(--border)',
                            padding: '14px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '14px',
                        }}>
                            {category.image ? (
                                <img src={category.image} alt={category.name} style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border)' }} />
                            ) : (
                                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🗂️</div>
                            )}
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '14px', fontWeight: 600 }}>{category.name}</p>
                                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>{category.slug}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(category._id)}
                                style={{ padding: '6px 14px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FECACA', fontSize: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--red)' }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminCategories
