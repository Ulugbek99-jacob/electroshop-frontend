import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../api/auth.api"

const Profile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi
    })

    if (isLoading) return <p className="text-center mt-10">Loading...</p>

    const user = data?.data

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-2xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
                <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
                    <p className="text-gray-700">Name: <span className="font-semibold">{user?.name}</span></p>
                    <p className="text-gray-700">Email: <span className="font-semibold">{user?.email}</span></p>
                    <p className="text-gray-700">Role: <span className="font-semibold capitalize">{user?.role}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Profile