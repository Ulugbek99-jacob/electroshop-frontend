import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../api/auth.api"

const Profile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi
    })

    if (isLoading) return <p>Yuklanmoqda...</p>

    const user = data?.data

    return (
        <div>
            <h1>Profil</h1>
            <p>Ism: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Rol: {user?.role}</p>
        </div>
    )
}

export default Profile