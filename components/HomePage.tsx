
import React from 'react';
import { Page } from '../types';

interface HomePageProps {
    onShowPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onShowPage }) => {
    return (
        <header className="h-screen flex items-center justify-center text-center text-white bg-[url('https://picsum.photos/id/1062/1920/1080')] bg-no-repeat bg-center bg-cover relative">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 p-4 animate-fade-in-up">
                <h1 className="font-dancing text-6xl md:text-8xl mb-4 text-shadow-lg">PET ADOPTION</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Your Bridge to Loving Homes for Pets! Connect with shelters, adopt, and care for animals in need.
                </p>
                <a onClick={() => onShowPage(Page.Adopt)} className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold cursor-pointer transition transform hover:scale-105 hover:shadow-2xl inline-block">
                    Start Adopting <i className="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </header>
    );
};

export default HomePage;
