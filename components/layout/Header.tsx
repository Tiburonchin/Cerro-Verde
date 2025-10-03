
import React from 'react';
import { User } from '../../types';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Bienvenido al Sistema</h1>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <UserIcon />
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                >
                    <LogoutIcon/>
                    <span>Salir</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
