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
            navigate("/")  // bosh sahifaga yo'naltiradi
        } catch (err) {
            setError("Email yoki parol noto'g'ri")
        }
    }

    return (
        <div>
            <h1>Kirish</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Kirish</button>
            </form>
        </div>
    )
}

export default Login