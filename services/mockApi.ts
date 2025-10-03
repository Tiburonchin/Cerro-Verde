
import { Partner, User } from '../types';
import { UserRole, ConstructionStatus, PaymentType } from '../constants';

export const mockUsers: User[] = [
    { id: '1', name: 'Admin', role: UserRole.Admin },
    { id: '2', name: 'Tesorero', role: UserRole.Treasurer },
    { id: '3', name: 'Secretario', role: UserRole.Secretary },
];

let mockPartners: Partner[] = [
    {
        id: '1',
        firstName: 'Juan',
        lastName: 'Perez',
        dni: '12345678',
        phone: '987654321',
        email: 'juan.perez@example.com',
        joinDate: '2022-01-15T00:00:00.000Z',
        property: { block: 'A', lot: '12', status: ConstructionStatus.Finished },
        payments: [
            { id: 'p1', date: '2023-10-05T00:00:00.000Z', type: PaymentType.Water, amount: 50, receiptNumber: 'R001' },
            { id: 'p2', date: '2023-11-05T00:00:00.000Z', type: PaymentType.Water, amount: 50, receiptNumber: 'R002' },
            { id: 'p3', date: '2023-11-10T00:00:00.000Z', type: PaymentType.Contribution, amount: 20, receiptNumber: 'R003' },
        ],
        attendance: [
            { id: 'a1', date: '2023-09-20T00:00:00.000Z', attended: true },
            { id: 'a2', date: '2023-10-20T00:00:00.000Z', attended: false },
            { id: 'a3', date: '2023-11-20T00:00:00.000Z', attended: true },
        ],
    },
    {
        id: '2',
        firstName: 'Maria',
        lastName: 'Gomez',
        dni: '87654321',
        phone: '912345678',
        email: 'maria.gomez@example.com',
        joinDate: '2021-07-20T00:00:00.000Z',
        property: { block: 'B', lot: '05', status: ConstructionStatus.InProgress },
        payments: [
             { id: 'p4', date: '2023-10-06T00:00:00.000Z', type: PaymentType.Water, amount: 50, receiptNumber: 'R004' },
             { id: 'p5', date: '2023-11-06T00:00:00.000Z', type: PaymentType.Registration, amount: 100, receiptNumber: 'R005' },
        ],
        attendance: [
            { id: 'a4', date: '2023-09-20T00:00:00.000Z', attended: true },
            { id: 'a5', date: '2023-10-20T00:00:00.000Z', attended: true },
            { id: 'a6', date: '2023-11-20T00:00:00.000Z', attended: true },
        ],
    },
    {
        id: '3',
        firstName: 'Carlos',
        lastName: 'Rodriguez',
        dni: '11223344',
        phone: '998877665',
        email: 'carlos.r@example.com',
        joinDate: '2023-02-10T00:00:00.000Z',
        property: { block: 'A', lot: '21', status: ConstructionStatus.Unbuilt },
        payments: [],
        attendance: [
            { id: 'a7', date: '2023-11-20T00:00:00.000Z', attended: false },
        ],
    },
];

const simulateDelay = <T,>(data: T): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, 500);
    });
};

export const fetchPartners = (): Promise<Partner[]> => {
    return simulateDelay(mockPartners);
};

export const fetchPartnerById = (id: string): Promise<Partner | undefined> => {
    return simulateDelay(mockPartners.find(p => p.id === id));
};

export const addPartner = (partnerData: Omit<Partner, 'id' | 'payments' | 'attendance'>): Promise<Partner> => {
    const newPartner: Partner = {
        ...partnerData,
        id: (mockPartners.length + 1).toString(),
        payments: [],
        attendance: [],
    };
    mockPartners.push(newPartner);
    return simulateDelay(newPartner);
};

export const updatePartner = (id: string, updatedData: Partial<Partner>): Promise<Partner | null> => {
    const index = mockPartners.findIndex(p => p.id === id);
    if (index !== -1) {
        mockPartners[index] = { ...mockPartners[index], ...updatedData };
        return simulateDelay(mockPartners[index]);
    }
    return simulateDelay(null);
};

export const deletePartner = (id: string): Promise<boolean> => {
    const index = mockPartners.findIndex(p => p.id === id);
    if (index !== -1) {
        mockPartners.splice(index, 1);
        return simulateDelay(true);
    }
    return simulateDelay(false);
};
