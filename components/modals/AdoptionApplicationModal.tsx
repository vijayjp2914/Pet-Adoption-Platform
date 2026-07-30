
import React, { useState } from 'react';
import Modal from './Modal';
import { Pet } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AdoptionApplicationModalProps {
    pet: Pet;
    onClose: () => void;
}

const AdoptionApplicationModal: React.FC<AdoptionApplicationModalProps> = ({ pet, onClose }) => {
    const { user, token } = useAuth();
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("You must be logged in to apply.");
            return;
        }
        setLoading(true);
        setError('');

        const applicationData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            reason,
            // FIX: Changed pet.id to pet._id to match Pet type
            petId: pet._id,
        };

        try {
            const res = await fetch(`/api/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(applicationData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to submit application');
            
            alert('Application submitted successfully!');
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Modal title="Error" onClose={onClose}>
                <p>You must be logged in to apply. Please close this and log in.</p>
            </Modal>
        )
    }

    return (
        <Modal title={`Adopt ${pet.name}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <p>You are applying as: <strong>{user.name}</strong> ({user.email})</p>
                <textarea 
                    id="reason" 
                    placeholder="Why do you want to adopt this pet? Tell us about your home and experience." 
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required 
                    className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition"
                />
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </Modal>
    );
};

export default AdoptionApplicationModal;
