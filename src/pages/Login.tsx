import { useState } from "react"
import { loginApi } from "../api/auth.api"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await loginApi({ email, password })
            login(result.user, result.token)
            navigate("/")
        } catch (err) {
            setError("Email or password is incorrect")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login