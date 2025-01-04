/*
  # Initial Schema Setup for MaremotorsWaverunners

  1. New Tables
    - customers: Store customer information
    - products: Inventory of jet skis and parts
    - quotes: Customer quotation requests
    - rentals: Rental bookings and tracking
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('jetski', 'part')),
  brand text NOT NULL,
  model text NOT NULL,
  condition text NOT NULL CHECK (condition IN ('new', 'used')),
  price decimal(10,2) NOT NULL,
  available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  product_type text NOT NULL CHECK (product_type IN ('jetski', 'part')),
  product_model text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Rentals table
CREATE TABLE IF NOT EXISTS rentals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  product_id uuid REFERENCES products(id),
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  total_price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users full access to customers"
  ON customers FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users full access to products"
  ON products FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users full access to quotes"
  ON quotes FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users full access to rentals"
  ON rentals FOR ALL TO authenticated
  USING (true);