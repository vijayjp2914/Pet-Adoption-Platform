import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [pets, setPets] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, petsRes, appsRes] = await Promise.all([
                fetch(`http://localhost:5000/api/users`, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`http://localhost:5000/api/pets`),
                fetch(`http://localhost:5000/api/applications`, { headers: { 'Authorization': `Bearer ${token}` } }),
            ]);
            const usersData = await usersRes.json();
            const petsData = await petsRes.json();
            const appsData = await appsRes.json();
            setUsers(usersData);
            setPets(petsData);
            setApplications(appsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [token]);

    const handleDeletePet = async (petId) => {
        if (window.confirm('Are you sure you want to delete this pet?')) {
            try {
                await fetch(`http://localhost:5000/api/pets/${petId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Pet deleted successfully');
                fetchData();
            } catch (error) {
                alert('Failed to delete pet');
            }
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            try {
                const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                alert('User deleted successfully');
                fetchData();
            } catch (error) {
                alert(`Failed to delete user: ${error.message}`);
            }
        }
    };

    const handleUpdateApplication = async (appId, status) => {
        if (!window.confirm(`Are you sure you want to ${status.toLowerCase()} this application?`)) return;
        try {
            await fetch(`http://localhost:5000/api/applications/${appId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            alert(`Application ${status.toLowerCase()} successfully`);
            fetchData();
        } catch (error) {
            alert(`Failed to update application status`);
        }
    };


    if (loading) return <p className="text-center p-10">Loading Dashboard...</p>;

    return (
        <section className="p-4 sm:p-8 max-w-7xl mx-auto animate-fade-in">
            <h1 className="text-center text-4xl font-bold mb-8 text-indigo-600">Admin Dashboard</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Users Table */}
                <div className="bg-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Users</h2>
                    <div className="overflow-auto max-h-96">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 sticky top-0"><tr><th className="p-2">Name</th><th className="p-2">Email</th><th className="p-2">Role</th><th className="p-2">Actions</th></tr></thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id} className="border-b">
                                        <td className="p-2">{user.name}</td><td className="p-2">{user.email}</td><td className="p-2 capitalize">{user.role} {user.subrole ? `(${user.subrole})` : ''}</td>
                                        <td className="p-2">
                                            {user.role !== 'admin' && (
                                                <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pets Table */}
                <div className="bg-white p-6 rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Pets</h2>
                    <div className="overflow-auto max-h-96">
                        <table className="w-full text-left">
                             <thead className="bg-gray-100 sticky top-0"><tr><th className="p-2">Name</th><th className="p-2">Breed</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                            <tbody>
                                {pets.map(pet => (
                                    <tr key={pet._id} className="border-b">
                                        <td className="p-2">{pet.name}</td><td className="p-2">{pet.breed}</td><td className="p-2 capitalize">{pet.status}</td>
                                        <td className="p-2"><button onClick={() => handleDeletePet(pet._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Applications Table */}
                 <div className="bg-white p-6 rounded-2xl shadow-xl lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">Adoption Applications</h2>
                    <div className="overflow-auto max-h-96">
                        <table className="w-full text-left">
                           <thead className="bg-gray-100 sticky top-0"><tr><th className="p-2">Applicant</th><th className="p-2">Pet</th><th className="p-2">Status</th><th className="p-2">Actions</th></tr></thead>
                            <tbody>
                                {applications.map(app => (
                                    <tr key={app._id} className="border-b">
                                        <td className="p-2">{app.name}</td>
                                        <td className="p-2">{app.petId?.name || 'N/A'}</td>
                                        <td className="p-2">{app.status}</td>
                                        <td className="p-2">
                                            {app.status === 'Pending' ? (
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdateApplication(app._id, 'Approved')} className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600">Approve</button>
                                                    <button onClick={() => handleUpdateApplication(app._id, 'Rejected')} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">Reject</button>
                                                </div>
                                            ) : (
                                                <span>-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;