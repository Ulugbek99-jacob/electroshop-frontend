import { useQuery } from "@tanstack/react-query"
import { getProfileApi } from "../api/auth.api"

const Profile = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfileApi
    })

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
        </div>
    )

    const user = data?.data

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
            <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '32px' }}>Profile</h1>

                <div style={{ background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)', padding: '28px' }}>
                    {/* Avatar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '50%',
                            background: 'var(--blue)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '22px', fontWeight: 700,
                        }}>
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <p style={{ fontSize: '17px', fontWeight: 700 }}>{user?.name}</p>
                            <span style={{
                                fontSize: '11px', fontWeight: 600, padding: '2px 8px',
                                borderRadius: '20px', textTransform: 'capitalize',
                                background: user?.role === 'admin' ? '#EFF6FF' : '#F0FDF4',
                                color: user?.role === 'admin' ? 'var(--blue)' : 'var(--green)',
                            }}>
                                {user?.role}
                            </span>
                        </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { label: 'Full Name', value: user?.name },
                            { label: 'Email', value: user?.email },
                            { label: 'Role', value: user?.role },
                        ].map(({ label, value }) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
                                <span style={{ fontSize: '14px', fontWeight: 500, textTransform: 'capitalize' }}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
