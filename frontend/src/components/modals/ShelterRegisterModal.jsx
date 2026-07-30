import React, { useState } from 'react';
import Modal from './Modal';

const ShelterRegisterModal = ({ onClose, onShowLogin }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', address: '', phone: '', subrole: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.subrole) {
            setError('Please choose a type.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:5000/api/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, role: 'shelter' }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            alert('Registration successful! Please login.');
            onClose();
            onShowLogin();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title="Pet Giver/Shelter Registration" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <input type="text" id="name" placeholder="Name (Individual or Shelter)" onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg" />
                <input type="email" id="email" placeholder="Email" onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg" />
                <input type="password" id="password" placeholder="Password" onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg" />
                <input type="text" id="address" placeholder="Address" onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg" />
                <input type="text" id="phone" placeholder="Phone Number" onChange={handleChange} required className="p-3 border-2 border-gray-200 rounded-lg" />
                <select id="subrole" required onChange={handleChange} value={formData.subrole} className="p-3 border-2 border-gray-200 rounded-lg">
                    <option value="">Choose Type</option>
                    <option value="shelter">Shelter</option>
                    <option value="pet_giver">Pet Giver (Individual)</option>
                </select>
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg disabled:opacity-50">
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </Modal>
    );
};

export default ShelterRegisterModal;