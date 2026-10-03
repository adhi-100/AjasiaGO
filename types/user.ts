import { ShippingAddress } from './order';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  savedAddresses: (ShippingAddress & { id: string; isDefault?: boolean })[];
  createdAt: string;
}
