
import React from 'react';
import { useAuth } from '../context/AuthContext';

const NavLink = ({ onClick, icon, children }) => (
    <li>
        <a onClick={onClick} className="flex items-center gap-2 text-gray-700 hover:bg-indigo-400 hover:text-white px-4 py-2 rounded-full transition-all duration-300 cursor-pointer">
            <i className={icon}></i> {children}
        </a>
    </li>
);

const Navbar = ({ onShowPage, onShowModal }) => {
    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        onShowPage('home');
    }

    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a onClick={() => onShowPage('home')} className="text-3xl font-bold font-dancing text-indigo-600 cursor-pointer">
                            PetAdopt
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-2">
                            <NavLink onClick={() => onShowPage('home')} icon="fas fa-home">Home</NavLink>
                            <NavLink onClick={() => onShowPage('adopt')} icon="fas fa-paw">Adopt</NavLink>
                            {isAuthenticated && user.role === 'shelter' && (
                                <NavLink onClick={() => onShowPage('submit-pet')} icon="fas fa-plus-circle">Submit Pet</NavLink>
                            )}
                            <NavLink onClick={() => onShowPage('guides')} icon="fas fa-book">Guides</NavLink>
                            
                            {!isAuthenticated && (
                                <>
                                    <NavLink onClick={() => onShowModal('adopter-register')} icon="fas fa-user-plus">Adopter Register</NavLink>
                                    <NavLink onClick={() => onShowModal('shelter-register')} icon="fas fa-building">Shelter Register</NavLink>
                                    <NavLink onClick={() => onShowModal('login')} icon="fas fa-sign-in-alt">Login</NavLink>
                                </>
                            )}

                            {user && user.role === 'admin' && (
                                 <NavLink onClick={() => onShowPage('admin')} icon="fas fa-shield-alt">Dashboard</NavLink>
                            )}
                            
                            {isAuthenticated ? (
                                <li>
                                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                                        <i className="fas fa-sign-out-alt mr-2"></i>Logout
                                    </button>
                                </li>
                            ) : (
                                <NavLink onClick={() => onShowModal('admin-login')} icon="fas fa-shield-alt">Admin</NavLink>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
    