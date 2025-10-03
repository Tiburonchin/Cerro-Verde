
import React, { useState, useEffect, useMemo } from 'react';
import { Partner } from '../types';
import { fetchPartners } from '../services/mockApi';
import Spinner from './shared/Spinner';
import Modal from './shared/Modal';
import { ConstructionStatus, PaymentType } from '../constants';

interface PartnerListProps {
    onSelectPartner: (partner: Partner) => void;
}

const PartnerList: React.FC<PartnerListProps> = ({ onSelectPartner }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getPartners = async () => {
            try {
                const data = await fetchPartners();
                setPartners(data);
            } catch (error) {
                console.error("Failed to fetch partners:", error);
            } finally {
                setLoading(false);
            }
        };
        getPartners();
    }, []);

    const filteredPartners = useMemo(() => {
        return partners.filter(partner =>
            `${partner.firstName} ${partner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            partner.dni.includes(searchTerm)
        );
    }, [partners, searchTerm]);
    
    const handleAddPartner = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // In a real app, you would get form data and call an API service
        console.log("Adding new partner...");
        setIsModalOpen(false);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Spinner /></div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">Gestión de Socios</h2>
                <div className="flex space-x-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Buscar por nombre o DNI..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                        + Nuevo
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nombre Completo</th>
                            <th scope="col" className="px-6 py-3">DNI</th>
                            <th scope="col" className="px-6 py-3">Teléfono</th>
                            <th scope="col" className="px-6 py-3">Propiedad</th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPartners.map(partner => (
                            <tr key={partner.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {partner.firstName} {partner.lastName}
                                </th>
                                <td className="px-6 py-4">{partner.dni}</td>
                                <td className="px-6 py-4">{partner.phone}</td>
                                <td className="px-6 py-4">Mz. {partner.property.block}, Lt. {partner.property.lot}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => onSelectPartner(partner)} className="font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredPartners.length === 0 && (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">No se encontraron socios.</p>
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Socio">
                <form onSubmit={handleAddPartner} className="space-y-4">
                    {/* Simplified Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombres</label>
                            <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Apellidos</label>
                            <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">DNI</label>
                            <input type="text" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                            <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600" />
                        </div>
                    </div>
                     <div className="flex justify-end space-x-2 pt-4">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Guardar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default PartnerList;
