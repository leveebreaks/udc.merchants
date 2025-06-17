export interface Merchant {
  id: number;
  name: string;
  email: string;
  category: 'Retail' | 'Food' | 'Services';
}