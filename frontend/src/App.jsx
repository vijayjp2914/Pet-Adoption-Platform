
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import AdoptPage from './pages/AdoptPage';
import SubmitPetPage from './pages/SubmitPetPage';
import GuidesPage from './pages/GuidesPage';
import AdminDashboard from './pages/AdminDashboard';
import AdopterRegisterModal from './components/modals/AdopterRegisterModal';
import ShelterRegisterModal from './components/modals/ShelterRegisterModal';
import LoginModal from './components/modals/LoginModal';
import AdminLoginModal from './components/modals/AdminLoginModal';
import AdoptionApplicationModal from './components/modals/AdoptionApplicationModal';


const App = () => {
    const [activePage, setActivePage] = useState('home');
    const [activeModal, setActiveModal] = useState(null);
    const [selectedPet, setSelectedPet] = useState(null);
    const { user, logout } = useAuth();
    
    const handleShowPage = (page) => {
        setActivePage(page);
    };

    const handleShowModal = (modal) => {
        setActiveModal(modal);
    };

    const handleAdoptClick = (pet) => {
        if (!user) {
            alert('Please log in as an adopter to apply.');
            handleShowModal('login');
            return;
        }
        if (user.role !== 'adopter') {
            alert('Only adopters can apply for pets.');
            return;
        }
        setSelectedPet(pet);
        handleShowModal('adoption-application');
    };

    const renderPage = () => {
        if (user && user.role === 'admin' && activePage === 'admin') {
            return <AdminDashboard />;
        }
        switch (activePage) {
            case 'home':
                return <HomePage onShowPage={handleShowPage} />;
            case 'adopt':
                return <AdoptPage onAdoptClick={handleAdoptClick} />;
            case 'submit-pet':
                return <SubmitPetPage onShowLogin={() => handleShowModal('login')} />;
            case 'guides':
                return <GuidesPage />;
            default:
                return <HomePage onShowPage={handleShowPage} />;
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen text-gray-800">
            <Navbar onShowPage={handleShowPage} onShowModal={handleShowModal} />
            <main>
                {renderPage()}
            </main>
            <Footer />
            <Chatbot />

            {activeModal === 'adopter-register' && <AdopterRegisterModal onClose={() => handleShowModal(null)} onShowLogin={() => handleShowModal('login')} />}
            {activeModal === 'shelter-register' && <ShelterRegisterModal onClose={() => handleShowModal(null)} onShowLogin={() => handleShowModal('login')} />}
            {activeModal === 'login' && <LoginModal onClose={() => handleShowModal(null)} />}
            {activeModal === 'admin-login' && <AdminLoginModal onClose={() => handleShowModal(null)} onAdminLoginSuccess={() => handleShowPage('admin')} />}
            {activeModal === 'adoption-application' && selectedPet && <AdoptionApplicationModal pet={selectedPet} onClose={() => handleShowModal(null)} />}
        </div>
    );
};

export default App;
    