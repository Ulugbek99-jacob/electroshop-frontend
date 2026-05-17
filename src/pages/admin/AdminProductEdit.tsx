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
            console.log("imageUrl:", p.images?.[0])
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
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
                <input name="description" value={form.description} placeholder="Description" onChange={handleChange} />
                <input name="price" type="number" value={form.price} placeholder="Price" onChange={handleChange} />
                <input name="stock" type="number" value={form.stock} placeholder="Stock" onChange={handleChange} />
                <input name="brand" value={form.brand} placeholder="Brand" onChange={handleChange} />
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploading && <p>Uploading...</p>}
                {imageUrl !== "" && <img src={imageUrl} width={100} alt="product" />}
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default AdminProductEdit