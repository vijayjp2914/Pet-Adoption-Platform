
import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginModalProps {
    onClose: () => void;
    // FIX: Renamed prop to match usage in App.tsx
    onAdminLoginSuccess: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onAdminLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }), // No role needed for admin
            });
            const data = await res.json();
            if (!res.ok || data.role !== 'admin') throw new Error(data.message || 'Invalid admin credentials');
            
            login({ _id: data._id, name: data.name, email: data.email, role: data.role }, data.token);
            onAdminLoginSuccess();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Admin Login" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50">
                     {loading ? 'Logging in...' : 'Login as Admin'}
                </button>
            </form>
        </Modal>
    );
};

export default AdminLoginModal;
