
import React from 'react';
import type { View } from '../../App';

interface SidebarProps {
    setView: (view: View) => void;
    currentView: View;
}

const DashboardIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const PartnersIcon = () => (
    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ setView, currentView }) => {
    const navItemClasses = (view: View) => 
        `flex items-center px-4 py-3 text-gray-600 dark:text-gray-300 transition-colors duration-200 transform rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
            (currentView === view || (currentView === 'partner-details' && view === 'partners')) ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`;

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
            <div className="flex items-center justify-center h-20 border-b dark:border-gray-700">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">Cerro Verde</h1>
            </div>
            <nav className="flex-1 px-4 py-8 space-y-2">
                <button onClick={() => setView('dashboard')} className={navItemClasses('dashboard')}>
                    <DashboardIcon />
                    <span className="mx-4 font-medium">Dashboard</span>
                </button>
                <button onClick={() => setView('partners')} className={navItemClasses('partners')}>
                    <PartnersIcon />
                    <span className="mx-4 font-medium">Socios</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
