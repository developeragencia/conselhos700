-- Users
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  phone TEXT,
  cpf TEXT,
  credits DECIMAL(10,2) DEFAULT 10.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Consultants
CREATE TABLE IF NOT EXISTS consultants (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  specialty TEXT,
  description TEXT,
  price_per_minute DECIMAL(10,2) NOT NULL DEFAULT 3.50,
  rating DECIMAL(3,2) DEFAULT 5.00,
  review_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'online',
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Credits transactions
CREATE TABLE IF NOT EXISTS credits_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('add','debit')),
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  reference_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Consultations
CREATE TABLE IF NOT EXISTS consultations (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  consultant_id TEXT NOT NULL,
  started_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','ended','cancelled')),
  price_per_minute_snapshot DECIMAL(10,2) NOT NULL,
  total_charged DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  consultation_id TEXT NOT NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('user','consultant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  consultant_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
