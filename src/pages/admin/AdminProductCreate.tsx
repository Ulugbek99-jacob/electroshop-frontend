import { useState } from "react"
import api from "../../api/axios"
import { useNavigate } from "react-router-dom"

const AdminProductCreate = () => {
    const navigate = useNavigate()
    const [imageUrl, setImageUrl] = useState("")
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        brand: "",
    })

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
            await api.post("/products", {
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
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h1>
                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input name="name" placeholder="Name" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="slug" placeholder="Slug" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <textarea name="description" placeholder="Description" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 h-24" />
                        <input name="price" type="number" placeholder="Price" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="stock" type="number" placeholder="Stock" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="brand" placeholder="Brand" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input type="file" accept="image/*" onChange={handleImageUpload}
                            className="border border-gray-300 rounded px-4 py-2" />
                        {uploading && <p className="text-blue-500">Uploading...</p>}
                        {imageUrl !== "" && <img src={imageUrl} alt="preview" className="w-32 h-32 object-cover rounded" />}
                        <button type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminProductCreate