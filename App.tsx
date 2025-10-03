
import React, { useState, useEffect } from 'react';
import { User, Partner } from './types';
import { UserRole } from './constants';
import { mockUsers, fetchPartners } from './services/mockApi';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PartnerList from './components/PartnerList';
import PartnerDetails from './components/PartnerDetails';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Spinner from './components/shared/Spinner';

export type View = 'dashboard' | 'partners' | 'partner-details';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [view, setView] = useState<View>('dashboard');
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    useEffect(() => {
        // Simulate checking for a logged-in user
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleLogin = (username: string): boolean => {
        const user = mockUsers.find(u => u.name.toLowerCase() === username.toLowerCase());
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('dashboard');
    };

    const handleSelectPartner = (partner: Partner) => {
        setSelectedPartner(partner);
        setView('partner-details');
    }

    const renderView = () => {
        switch (view) {
            case 'dashboard':
                return <Dashboard setView={setView} onSelectPartner={handleSelectPartner} />;
            case 'partners':
                return <PartnerList onSelectPartner={handleSelectPartner} />;
            case 'partner-details':
                return selectedPartner ? <PartnerDetails partner={selectedPartner} onBack={() => setView('partners')} /> : <PartnerList onSelectPartner={handleSelectPartner} />;
            default:
                return <Dashboard setView={setView} onSelectPartner={handleSelectPartner} />;
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><Spinner /></div>;
    }

    if (!currentUser) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Sidebar setView={setView} currentView={view} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header user={currentUser} onLogout={handleLogout} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
