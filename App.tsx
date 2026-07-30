import React, { useState } from 'react';
import { Page, ModalType, Pet } from './types';
import { useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AdoptPage from './components/AdoptPage';
import SubmitPetPage from './components/SubmitPetPage';
import GuidesPage from './components/GuidesPage';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdopterRegisterModal from './components/modals/AdopterRegisterModal';
import ShelterRegisterModal from './components/modals/ShelterRegisterModal';
import LoginModal from './components/modals/LoginModal';
import AdminLoginModal from './components/modals/AdminLoginModal';
import AdoptionApplicationModal from './components/modals/AdoptionApplicationModal';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState<Page>(Page.Home);
    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const { user, logout } = useAuth();

    const handleShowPage = (page: Page) => {
        setActivePage(page);
    };

    const handleShowModal = (modal: ModalType | null) => {
        setActiveModal(modal);
    };
    
    const handleLogout = () => {
        logout();
        handleShowPage(Page.Home);
    };

    const handleAdoptClick = (pet: Pet) => {
        if (!user) {
            alert('Please log in as an adopter to apply.');
            handleShowModal(ModalType.Login);
            return;
        }
        if (user.role !== 'adopter') {
            alert('Only adopters can apply for pets.');
            return;
        }
        setSelectedPet(pet);
        handleShowModal(ModalType.AdoptionApplication);
    };

    const renderPage = () => {
        if (user?.role === 'admin' && activePage === Page.Admin) {
            return <AdminDashboard />;
        }
        switch (activePage) {
            case Page.Home:
                return <HomePage onShowPage={handleShowPage} />;
            case Page.Adopt:
                return <AdoptPage onAdoptClick={handleAdoptClick} />;
            case Page.SubmitPet:
                return <SubmitPetPage onShowLogin={() => handleShowModal(ModalType.Login)} />;
            case Page.Guides:
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

            {activeModal === ModalType.AdopterRegister && <AdopterRegisterModal onClose={() => handleShowModal(null)} onShowLogin={() => handleShowModal(ModalType.Login)} />}
            {activeModal === ModalType.ShelterRegister && <ShelterRegisterModal onClose={() => handleShowModal(null)} onShowLogin={() => handleShowModal(ModalType.Login)} />}
            {activeModal === ModalType.Login && <LoginModal onClose={() => handleShowModal(null)} />}
            {activeModal === ModalType.AdminLogin && <AdminLoginModal onClose={() => handleShowModal(null)} onAdminLoginSuccess={() => handleShowPage(Page.Admin)} />}
            {activeModal === ModalType.AdoptionApplication && selectedPet && <AdoptionApplicationModal pet={selectedPet} onClose={() => handleShowModal(null)} />}
        </div>
    );
};

export default App;
