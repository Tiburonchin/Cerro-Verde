
import { UserRole, ConstructionStatus, PaymentType } from './constants';

export interface User {
  id: string;
  name:string;
  role: UserRole;
}

export interface Property {
  block: string;
  lot: string;
  status: ConstructionStatus;
}

export interface Payment {
  id: string;
  date: string; 
  type: PaymentType;
  amount: number;
  receiptNumber: string;
}

export interface Attendance {
  id: string;
  date: string;
  attended: boolean;
}

export interface Partner {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  joinDate: string;
  property: Property;
  payments: Payment[];
  attendance: Attendance[];
}
