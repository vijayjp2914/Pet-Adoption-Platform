import React from 'react';
import { Pet } from '../types';

interface PetCardProps {
    pet: Pet;
    onAdoptClick: (pet: Pet) => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onAdoptClick }) => {
    const isAdopted = pet.status === 'adopted';

    return (
        <div className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2 relative group ${isAdopted ? 'opacity-60' : ''}`}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-cyan-400"></div>
            <div className="overflow-hidden h-64">
                <img src={pet.image} alt={pet.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="p-6 text-center">
                <h3 className="text-indigo-600 text-2xl font-bold mb-2">{pet.name} <span className="text-gray-500 text-lg capitalize">({pet.status})</span></h3>
                <p className="mb-1 text-gray-600"><strong>Breed:</strong> {pet.breed}</p>
                <p className="mb-1 text-gray-600"><strong>Age:</strong> <span className="capitalize">{pet.age}</span></p>
                <p className="mb-1 text-gray-600"><strong>Health:</strong> {pet.health}</p>
                <p className="mb-4 text-gray-600"><strong>Behavior:</strong> {pet.behavior}</p>
                
                {isAdopted ? (
                    <p className="w-full mt-4 bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-full">Adopted!</p>
                ) : (
                    <button 
                        onClick={() => onAdoptClick(pet)} 
                        className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 hover:from-teal-500 hover:to-cyan-500 transform hover:scale-105"
                    >
                        Adopt Me!
                    </button>
                )}
            </div>
        </div>
    );
};

export default PetCard;
