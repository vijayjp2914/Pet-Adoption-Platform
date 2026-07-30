
import React from 'react';

const HomePage = ({ onShowPage }) => {
    return (
        <header className="h-[calc(100vh-80px)] flex items-center justify-center text-center text-white bg-[url('https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-no-repeat bg-center bg-cover relative">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 p-4 animate-fade-in-up">
                <h1 className="font-dancing text-6xl md:text-8xl mb-4">PET ADOPTION</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Your Bridge to Loving Homes for Pets! Connect with shelters, adopt, and care for animals in need.
                </p>
                <a onClick={() => onShowPage('adopt')} className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold cursor-pointer transition transform hover:scale-105 hover:shadow-2xl inline-block">
                    Start Adopting <i className="fas fa-arrow-right ml-2"></i>
                </a>
            </div>
        </header>
    );
};

export default HomePage;
    