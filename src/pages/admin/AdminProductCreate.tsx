import { useState } from "react"
import api from "../../api/axios"
import { useNavigate } from "react-router-dom"

const AdminProductCreate = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        brand: "",
        images: [""],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await api.post("/products", {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
            })
            navigate("/admin/products")
        } catch (error) {
            alert("Error occurred")
        }
    }

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="slug" placeholder="Slug" onChange={handleChange} />
                <textarea name="description" placeholder="Description" onChange={handleChange} />
                <input name="price" type="number" placeholder="Price" onChange={handleChange} />
                <input name="stock" type="number" placeholder="Stock" onChange={handleChange} />
                <input name="brand" placeholder="Brand" onChange={handleChange} />
                <input name="images" placeholder="Image URL" onChange={handleChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AdminProductCreate