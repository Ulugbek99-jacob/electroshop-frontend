import { useState } from "react"
import { registerApi } from "../api/auth.api"
import { useAuthStore } from "../store/authStore"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { login } = useAuthStore()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const result = await registerApi({ name, email, password })
            login(result.user, result.token)
            navigate("/")
        } catch (err) {
            setError("Xato yuz berdi")
        }
    }

    return (
        <div>
            <h1>Ro'yxatdan o'tish</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ism"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parol"
                />
                <button type="submit">Ro'yxatdan o'tish</button>
            </form>
        </div>
    )
}

export default Register