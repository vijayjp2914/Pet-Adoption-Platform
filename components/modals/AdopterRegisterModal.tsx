
import React from 'react';
import Modal from './Modal';

interface AdopterRegisterModalProps {
    onClose: () => void;
    onShowLogin: () => void;
}

const AdopterRegisterModal: React.FC<AdopterRegisterModalProps> = ({ onClose, onShowLogin }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically call an API to register the user
        alert('Registration successful! Please login.');
        onClose();
        onShowLogin();
    };

    return (
        <Modal title="Adopter Registration" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" id="adopterName" placeholder="Full Name" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="email" id="adopterEmail" placeholder="Email" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="password" id="adopterPassword" placeholder="Password" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="adopterAddress" placeholder="Address" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="adopterPhone" placeholder="Phone Number" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105">Register</button>
            </form>
        </Modal>
    );
};

export default AdopterRegisterModal;
