
import React, { useState } from 'react';
import { Partner, Payment, Attendance } from '../types';
import Card from './shared/Card';

interface PartnerDetailsProps {
    partner: Partner;
    onBack: () => void;
}

type Tab = 'info' | 'payments' | 'attendance';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full";
    const statusClasses = {
        'Terminado': "bg-green-100 text-green-800",
        'En Construcción': "bg-yellow-100 text-yellow-800",
        'Sin Construir': "bg-red-100 text-red-800",
    };
    return <span className={`${baseClasses} ${statusClasses[status as keyof typeof statusClasses]}`}>{status}</span>;
}


const PartnerDetails: React.FC<PartnerDetailsProps> = ({ partner, onBack }) => {
    const [activeTab, setActiveTab] = useState<Tab>('info');

    const renderInfo = () => (
        <div className="space-y-4">
            <Card title="Datos Personales">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold">DNI:</span> {partner.dni}</div>
                    <div><span className="font-semibold">Teléfono:</span> {partner.phone}</div>
                    <div><span className="font-semibold">Email:</span> {partner.email}</div>
                    <div><span className="font-semibold">Fecha de Ingreso:</span> {new Date(partner.joinDate).toLocaleDateString()}</div>
                </div>
            </Card>
            <Card title="Datos de Propiedad">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold">Manzana:</span> {partner.property.block}</div>
                    <div><span className="font-semibold">Lote:</span> {partner.property.lot}</div>
                    <div className="flex items-center space-x-2"><span className="font-semibold">Estado:</span> <StatusBadge status={partner.property.status} /></div>
                </div>
            </Card>
        </div>
    );

    // FIX: Changed JSX.Element to React.ReactNode to fix "Cannot find namespace 'JSX'" error.
    const renderTable = (headers: string[], data: (Payment | Attendance)[], renderRow: (item: any, index: number) => React.ReactNode) => (
         <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map(h => <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
            </table>
            {data.length === 0 && <p className="text-center py-4 text-gray-500">No hay registros.</p>}
        </div>
    );

    const renderPayments = () => (
        <Card title="Historial de Pagos">
            {renderTable(
                ["Fecha", "Tipo", "Monto", "Recibo"],
                partner.payments,
                (p: Payment, i) => (
                    <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{p.type}</td>
                        <td className="px-6 py-4">S/ {p.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">{p.receiptNumber}</td>
                    </tr>
                )
            )}
        </Card>
    );
    
    const renderAttendance = () => (
        <Card title="Registro de Asistencia">
             {renderTable(
                ["Fecha de Reunión", "Estado"],
                partner.attendance,
                (a: Attendance, i) => (
                    <tr key={a.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{new Date(a.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                            {a.attended ? 
                                <span className="text-green-600 font-semibold">Asistió</span> : 
                                <span className="text-red-600 font-semibold">Faltó</span>
                            }
                        </td>
                    </tr>
                )
            )}
        </Card>
    );

    const TabButton: React.FC<{tab: Tab, label: string}> = ({ tab, label }) => {
        const isActive = activeTab === tab;
        return (
            <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold rounded-md ${isActive ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
                {label}
            </button>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                     <button onClick={onBack} className="text-primary-600 dark:text-primary-400 hover:underline mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Volver a la lista
                    </button>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{partner.firstName} {partner.lastName}</h2>
                    <p className="text-gray-500 dark:text-gray-400">Cartilla de Socio</p>
                </div>
                 <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">Editar</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Eliminar</button>
                </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-2" aria-label="Tabs">
                    <TabButton tab="info" label="Información General" />
                    <TabButton tab="payments" label="Pagos" />
                    <TabButton tab="attendance" label="Asistencias" />
                </nav>
            </div>
            
            <div className="mt-4">
                {activeTab === 'info' && renderInfo()}
                {activeTab === 'payments' && renderPayments()}
                {activeTab === 'attendance' && renderAttendance()}
            </div>
        </div>
    );
};

export default PartnerDetails;
