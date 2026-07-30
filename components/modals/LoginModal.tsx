
import React, { useState } from 'react';
import Modal from './Modal';
import { UserRole } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole | ''>('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role) {
            setError('Please select a role.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            
            login({ _id: data._id, name: data.name, email: data.email, role: data.role, subrole: data.subrole, address: data.address, phone: data.phone }, data.token);
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Login" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <select value={role} onChange={e => setRole(e.target.value as UserRole)} required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="">Select Role</option>
                    <option value={UserRole.Adopter}>Adopter</option>
                    <option value={UserRole.Shelter}>Pet Giver/Shelter</option>
                </select>
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50">
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </Modal>
    );
};

export default LoginModal;
