
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchPartners } from '../services/mockApi';
import { Partner } from '../types';
import Card from './shared/Card';
import Spinner from './shared/Spinner';
import type { View } from '../App';

interface DashboardProps {
    setView: (view: View) => void;
    onSelectPartner: (partner: Partner) => void;
}

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

const Dashboard: React.FC<DashboardProps> = ({ setView, onSelectPartner }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Spinner /></div>;
    }

    const totalPayments = partners.reduce((acc, p) => acc + p.payments.reduce((pAcc, payment) => pAcc + payment.amount, 0), 0);
    const paymentsLast30Days = partners.reduce((acc, p) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentPayments = p.payments.filter(pay => new Date(pay.date) > thirtyDaysAgo);
        return acc + recentPayments.reduce((pAcc, payment) => pAcc + payment.amount, 0);
    }, 0);
    
    const attendanceData = partners.map(p => ({
        name: `${p.firstName.charAt(0)}. ${p.lastName}`,
        asistencias: p.attendance.filter(a => a.attended).length,
    }));

    const paymentTypeData = partners
        .flatMap(p => p.payments)
        .reduce((acc, payment) => {
            const existing = acc.find(item => item.name === payment.type);
            if (existing) {
                existing.value += payment.amount;
            } else {
                acc.push({ name: payment.type, value: payment.amount });
            }
            return acc;
        }, [] as { name: string; value: number }[]);
    
    const recentPartners = [...partners]
      .sort((a,b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
      .slice(0, 5);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Total de Socios">
                    <p className="text-4xl font-bold">{partners.length}</p>
                </Card>
                <Card title="Recaudación Total">
                    <p className="text-4xl font-bold">S/ {totalPayments.toLocaleString('es-PE')}</p>
                </Card>
                <Card title="Recaudado (Últimos 30 días)">
                    <p className="text-4xl font-bold">S/ {paymentsLast30Days.toLocaleString('es-PE')}</p>
                </Card>
                <Card title="Próxima Reunión">
                    <p className="text-2xl font-bold">20 de Diciembre, 2023</p>
                    <p className="text-sm text-gray-500">Asamblea General</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Reporte de Asistencia">
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128, 128, 128, 0.2)" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                                <Legend />
                                <Bar dataKey="asistencias" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Distribución de Pagos">
                     <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={paymentTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {paymentTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
             <Card title="Socios Recientes">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nombre</th>
                                <th scope="col" className="px-6 py-3">Fecha de Ingreso</th>
                                <th scope="col" className="px-6 py-3">Propiedad</th>
                            </tr>
                        </thead>
                        <tbody>
                           {recentPartners.map(p => (
                             <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer" onClick={() => onSelectPartner(p)}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.firstName} {p.lastName}
                                </th>
                                <td className="px-6 py-4">{new Date(p.joinDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">Mz. {p.property.block}, Lt. {p.property.lot}</td>
                             </tr>
                           ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
