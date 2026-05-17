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
        const response = await api.post("/uploads", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
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
        } catch (error) {
            alert("Error occurred")
        }
    }

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure?")) {
            await api.delete(`/category/${id}`)
            refetch()
        }
    }

    if (isLoading) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Add Category</h2>
                    <form onSubmit={handleCreate} className="flex flex-col gap-4">
                        <input name="name" value={form.name} placeholder="Name" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="slug" value={form.slug} placeholder="Slug" onChange={handleChange}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500" />
                        <input name="description" value={form.description} placeholder="Description" onChange={handleChange}
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
                <div className="flex flex-col gap-4">
                    {data?.data.map((category: any) => (
                        <div key={category._id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                {category.image && <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded" />}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                                    <p className="text-gray-500 text-sm">{category.slug}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(category._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
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