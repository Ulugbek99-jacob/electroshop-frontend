import { useState, useEffect } from "react"
import api from "../../api/axios"
import { useNavigate, useParams } from "react-router-dom"

const AdminProductEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        brand: "",
    })

    useEffect(() => {
        api.get(`/products/${id}`).then(res => {
            const p = res.data.data
            setForm({
                name: p.name,
                description: p.description,
                price: p.price,
                stock: p.stock,
                brand: p.brand,
            })
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
        const response = await api.post("/uploads", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        setImageUrl(response.data.url)
        setUploading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.put(`/products/${id}`, {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
                images: [imageUrl]
            })
            navigate("/admin/products")
        } catch (error) {
            alert("Error occurred")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input name="name" value={form.name} placeholder="Name" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 h-24" />
                        <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="stock" type="number" value={form.stock} placeholder="Stock" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="brand" value={form.brand} placeholder="Brand" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input type="file" accept="image/*" onChange={handleImageUpload}
                            className="border border-gray-300 rounded px-4 py-2" />
                        {uploading && <p className="text-blue-500">Uploading...</p>}
                        {imageUrl !== "" && <img src={imageUrl} alt="preview" className="w-32 h-32 object-cover rounded" />}
                        <button type="submit"
                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded font-semibold">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProductEdit