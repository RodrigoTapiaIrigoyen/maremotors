export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

export interface Quote {
  id: string;
  customer_id: string;
  product_type: 'jetski' | 'part';
  product_model: string;
  status: 'pending' | 'accepted' | 'rejected';
  notes: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  type: 'jetski' | 'part';
  brand: string;
  model: string;
  condition: 'new' | 'used';
  price: number;
  available: boolean;
  created_at: string;
}

export interface Rental {
  id: string;
  customer_id: string;
  product_id: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  total_price: number;
  created_at: string;
}