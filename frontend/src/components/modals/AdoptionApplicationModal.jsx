
import React, { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';

const AdoptionApplicationModal = ({ pet, onClose }) => {
    const { user, token } = useAuth();
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // The data payload is now simplified. The backend will get the user's details
        // from their secure token, fixing the root cause of the error.
        const applicationData = {
            reason,
            petId: pet._id,
        };

        try {
            const res = await fetch(`http://localhost:5000/api/applications`, {
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
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal title={`Adopt ${pet.name}`} onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
                <p>You are applying as: <strong>{user.name}</strong> ({user.email})</p>
                <textarea 
                    id="reason" 
                    placeholder="Why do you want to adopt this pet? Tell us about your home and experience." 
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required 
                    className="p-3 border-2 border-gray-200 rounded-lg"
                />
                <button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 rounded-lg disabled:opacity-50">
                    {loading ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </Modal>
    );
};

export default AdoptionApplicationModal;
