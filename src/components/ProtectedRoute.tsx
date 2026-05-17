import { useAuthStore } from "../store/authStore"
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
    adminOnly?: boolean
}

const ProtectedRoute = ({ children, adminOnly = false }: Props) => {
    const { isAuthenticated, user } = useAuthStore()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/" />
    }

    return <>{children}</>
}

export default ProtectedRoute