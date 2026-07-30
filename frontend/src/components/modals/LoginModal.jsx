import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!role) {
            setError('Please select a role.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:5000/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            
            login({ 
                _id: data._id, 
                name: data.name, 
                email: data.email, 
                role: data.role, 
                subrole: data.subrole,
                address: data.address,
                phone: data.phone
            }, data.token);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Login" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="p-3 border-2 border-gray-200 rounded-lg" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="p-3 border-2 border-gray-200 rounded-lg" />
                <select value={role} onChange={e => setRole(e.target.value)} required className="p-3 border-2 border-gray-200 rounded-lg">
                    <option value="">Select Role</option>
                    <option value="adopter">Adopter</option>
                    <option value="shelter">Pet Giver/Shelter</option>
                </select>
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg disabled:opacity-50">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </Modal>
    );
};

export default LoginModal;