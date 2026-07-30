
import React from 'react';

const GuideItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <li className="mb-4">
        <strong className="text-indigo-700">{title}:</strong> {children}
    </li>
);

const GuidesPage: React.FC = () => {
    return (
        <section className="py-12 px-4 max-w-4xl mx-auto mt-10 bg-white rounded-2xl shadow-xl">
            <h2 className="text-center text-4xl font-bold mb-8 text-indigo-600">Pet Care Guides</h2>
            <p className="text-center text-lg mb-6 text-gray-600">Comprehensive tips for caring for your new companion:</p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 text-lg">
                <GuideItem title="General Care">
                    Ensure fresh water, balanced nutrition, regular vet visits, grooming, and plenty of love. Monitor for signs of stress or illness.
                </GuideItem>
                <GuideItem title="Dog Care">
                    Daily exercise (walks, play), obedience training, socialization. Brush teeth weekly, clip nails monthly. Use flea prevention.
                </GuideItem>
                <GuideItem title="Cat Care">
                    Provide litter boxes (1 per cat +1), scratching posts, high perches. Indoor cats live longer; spay/neuter at 4-6 months.
                </GuideItem>
                <GuideItem title="Emergency Tips">
                    Know the poison hotline number. Signs of distress include labored breathing, vomiting, or seizures—seek immediate vet care.
                </GuideItem>
                <GuideItem title="Adopted Pet Transition">
                    Give your new pet space for the first 3 days to decompress. Establish a consistent routine. Use pheromone diffusers for anxiety if needed.
                </GuideItem>
                <GuideItem title="Nutrition Details">
                    Puppies/kittens need 3-4 small meals a day; adult pets typically need 2. Avoid raw diets unless approved by your veterinarian.
                </GuideItem>
                 <GuideItem title="Health Maintenance">
                    Stay up-to-date on vaccinations, deworming, and microchipping. Spaying or neutering can prevent future health and behavior issues.
                </GuideItem>
            </ul>
        </section>
    );
};

export default GuidesPage;
