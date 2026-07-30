
import React from 'react';
import Modal from './Modal';
import { ShelterSubRole } from '../../types';

interface ShelterRegisterModalProps {
    onClose: () => void;
    onShowLogin: () => void;
}

const ShelterRegisterModal: React.FC<ShelterRegisterModalProps> = ({ onClose, onShowLogin }) => {

     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Registration successful! Please login.');
        onClose();
        onShowLogin();
    };

    return (
        <Modal title="Pet Giver/Shelter Registration" onClose={onClose}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" id="shelterName" placeholder="Name (Individual or Shelter)" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="email" id="shelterEmail" placeholder="Email" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="password" id="shelterPassword" placeholder="Password" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="shelterAddress" placeholder="Address" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <input type="text" id="shelterPhone" placeholder="Phone Number" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition" />
                <select id="shelterSubrole" required className="p-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="">Choose Type</option>
                    <option value={ShelterSubRole.Shelter}>Shelter</option>
                    <option value={ShelterSubRole.PetGiver}>Pet Giver (Individual)</option>
                </select>
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 rounded-lg transition transform hover:scale-105">Register</button>
            </form>
        </Modal>
    );
};

export default ShelterRegisterModal;
