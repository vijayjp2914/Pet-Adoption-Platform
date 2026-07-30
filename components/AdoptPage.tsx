import React, { useState, useMemo, useEffect } from 'react';
import { Pet } from '../types';
import PetCard from './PetCard';

const TypeFilterButton: React.FC<{ type: string, icon: string, activeType: string, onClick: (type: string) => void }> = ({ type, icon, activeType, onClick }) => (
    <button
        onClick={() => onClick(type)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${activeType === type ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-indigo-200'}`}
    >
        <i className={`fas ${icon}`}></i>
        <span>{type === '' ? 'All Pets' : type.charAt(0).toUpperCase() + type.slice(1) + 's'}</span>
    </button>
);

interface AdoptPageProps {
    onAdoptClick: (pet: Pet) => void;
}

const AdoptPage: React.FC<AdoptPageProps> = ({ onAdoptClick }) => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchName, setSearchName] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterBreed, setFilterBreed] = useState('');
    const [filterAge, setFilterAge] = useState('');

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/pets`);
                if (!res.ok) throw new Error('Could not fetch pets');
                const data = await res.json();
                setPets(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPets();
    }, []);

    const breeds = useMemo(() => {
        const relevantPets = filterType ? pets.filter(p => p.type === filterType) : pets;
        return [...new Set(relevantPets.map(p => p.breed))];
    }, [pets, filterType]);

    const filteredPets = useMemo(() => {
        return pets.filter(pet => {
            const nameMatch = pet.name.toLowerCase().includes(searchName.toLowerCase());
            const typeMatch = filterType ? pet.type === filterType : true;
            const breedMatch = filterBreed ? pet.breed === filterBreed : true;
            const ageMatch = filterAge ? pet.age === filterAge : true;
            return nameMatch && typeMatch && breedMatch && ageMatch;
        });
    }, [pets, searchName, filterType, filterBreed, filterAge]);
    
    const handleTypeFilter = (type: string) => {
        setFilterType(type);
        setFilterBreed(''); // Reset breed filter when type changes
    };

    if(loading) return <p className="text-center mt-20 text-lg">Loading pets...</p>;
    if(error) return <p className="text-center mt-20 text-red-500 text-lg">Error: {error}</p>

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto mt-10 bg-white rounded-2xl shadow-xl animate-fade-in">
            <h2 className="text-center text-4xl font-bold mb-4 text-indigo-600">Available Pets for Adoption</h2>
            
            <div className="flex flex-wrap gap-3 mb-8 justify-center p-4">
                <TypeFilterButton type="" icon="fa-paw" activeType={filterType} onClick={handleTypeFilter} />
                <TypeFilterButton type="dog" icon="fa-dog" activeType={filterType} onClick={handleTypeFilter} />
                <TypeFilterButton type="cat" icon="fa-cat" activeType={filterType} onClick={handleTypeFilter} />
                <TypeFilterButton type="bird" icon="fa-dove" activeType={filterType} onClick={handleTypeFilter} />
            </div>

            <div className="flex flex-wrap gap-4 mb-8 justify-center p-4 bg-gray-50 rounded-lg">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="p-3 border-2 border-gray-200 rounded-full flex-grow min-w-[200px] focus:border-indigo-500 focus:ring-indigo-500 transition"
                />
                <select value={filterBreed} onChange={e => setFilterBreed(e.target.value)} className="p-3 border-2 border-gray-200 rounded-full flex-grow min-w-[200px] focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="">All Breeds</option>
                    {breeds.map(breed => <option key={breed} value={breed}>{breed}</option>)}
                </select>
                <select value={filterAge} onChange={e => setFilterAge(e.target.value)} className="p-3 border-2 border-gray-200 rounded-full flex-grow min-w-[200px] focus:border-indigo-500 focus:ring-indigo-500 transition">
                    <option value="">All Ages</option>
                    <option value="puppy">Puppy</option>
                    <option value="adult">Adult</option>
                    <option value="senior">Senior</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPets.length > 0 ? (
                    filteredPets.map(pet => (
                        <PetCard key={pet._id} pet={pet} onAdoptClick={onAdoptClick} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-lg">No pets match your criteria. Try adjusting your filters!</p>
                )}
            </div>
        </section>
    );
};

export default AdoptPage;
