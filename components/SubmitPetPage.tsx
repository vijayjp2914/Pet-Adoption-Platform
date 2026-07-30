
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
// FIX: Imported Pet type to be used for type casting.
import { Application, ModalType, Pet } from '../types';
import { useAuth } from '../context/AuthContext';

interface SubmitPetPageProps {
    onShowLogin: () => void;
}

const SubmitPetPage: React.FC<SubmitPetPageProps> = ({ onShowLogin }) => {
    const { user, token } = useAuth();
    const [petData, setPetData] = useState({ name: '', type: 'dog', breed: '', age: 'puppy', health: '', behavior: '' });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(true);

    const fetchApplications = async () => {
        if (!token) return;
        try {
            setAppLoading(true);
            const res = await fetch(`/api/applications`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                 // Ensure petId is an object before accessing name
                const populatedData = data.map((app: any) => ({
                    ...app,
                    petName: app.petId?.name || 'N/A'
                }));
                setApplications(populatedData);
            }
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setAppLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'shelter') {
            fetchApplications();
        }
    }, [user, token]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPetData({ ...petData, [e.target.id]: e.target.value });
    };
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!imageFile) {
            alert('Please select an image.');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        Object.entries(petData).forEach(([key, value]) => formData.append(key, value));
        formData.append('image', imageFile);

        try {
            const res = await fetch(`/api/pets`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to submit pet');
            }
            alert('Pet submitted successfully!');
            setPetData({ name: '', type: 'dog', breed: '', age: 'puppy', health: '', behavior: '' });
            setImageFile(null);
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const handleUpdateApplicationStatus = async (appId: string, status: 'Approved' | 'Rejected') => {
        try {
             await fetch(`/api/applications/${appId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            alert(`Application has been ${status.toLowerCase()}!`);
            fetchApplications();
        } catch (error) {
            alert(`Failed to update application.`);
        }
    };

    if (!user || user.role !== 'shelter') {
        return (
            <section className="py-12 px-4 max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl text-center">
                <h2 className="text-3xl font-bold mb-4 text-indigo-600">Access Denied</h2>
                <p className="text-lg text-gray-600">You must be logged in as a Pet Giver or Shelter to submit a pet.</p>
                <button onClick={onShowLogin} className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105">
                    Login Now
                </button>
            </section>
        );
    }

    return (
        <section className="py-12 px-4 max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl animate-fade-in">
            <h2 className="text-center text-4xl font-bold mb-8 text-indigo-600">Submit Your Pet for Adoption</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
                 <select id="type" value={petData.type} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                </select>
                <input type="text" id="name" placeholder="Pet Name" value={petData.name} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="breed" placeholder="Breed" value={petData.breed} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <select id="age" value={petData.age} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="puppy">Puppy</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                </select>
                <input type="text" id="health" placeholder="Health Condition" value={petData.health} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="behavior" placeholder="Behavior" value={petData.behavior} onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="file" id="petImageFile" accept="image/*" onChange={handleFileChange} required className="p-3 border-2 border-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105 disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Pet'}
                </button>
            </form>
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-center mb-4 text-indigo-600">Adoption Requests for Your Pets</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                         <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <tr>
                                <th className="p-3">Applicant</th><th className="p-3">Email</th><th className="p-3">Pet</th><th className="p-3">Reason</th><th className="p-3">Status</th><th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {appLoading ? (
                            <tr><td colSpan={6} className="text-center p-4">Loading applications...</td></tr>
                        ) : applications.map(app => (
                             <tr key={app._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{app.name}</td>
                                <td className="p-3">{app.email}</td>
                                <td className="p-3">{(app.petId as Pet)?.name || 'N/A'}</td>
                                <td className="p-3 truncate max-w-xs">{app.reason}</td>
                                <td className="p-3 font-semibold">{app.status}</td>
                                <td className="p-3">
                                    {app.status === 'Pending' ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleUpdateApplicationStatus(app._id, 'Approved')} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600">Approve</button>
                                            <button onClick={() => handleUpdateApplicationStatus(app._id, 'Rejected')} className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600">Reject</button>
                                        </div>
                                    ) : (
                                        <span className={`font-semibold ${app.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>{app.status}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                     {!appLoading && applications.length === 0 && <p className="text-center text-gray-500 mt-4">No applications received yet.</p>}
                </div>
            </div>
        </section>
    );
};

export default SubmitPetPage;
