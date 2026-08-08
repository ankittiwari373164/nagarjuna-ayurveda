-- ============================================================
-- Singhal Medicare / NAKC — Supabase schema
-- Run this whole file once in Supabase SQL Editor
-- ============================================================

create extension if not exists "uuid-ossp";

-- PATIENTS -----------------------------------------------------
create table if not exists patients (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  phone text not null,
  age int,
  gender text,
  address text,
  condition text,
  notes text,
  created_by text default 'reception',
  created_at timestamptz default now()
);

-- APPOINTMENTS --------------------------------------------------
create table if not exists appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid references patients(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  age int,
  gender text,
  condition text,
  preferred_date date,
  preferred_time text,
  message text,
  status text default 'pending',        -- pending / confirmed / completed / cancelled
  payment_status text default 'unpaid', -- unpaid / paid_pending_verification / paid
  payment_note text,
  amount numeric default 0,
  created_at timestamptz default now()
);

-- CONTACT / ENQUIRY FORM ----------------------------------------
create table if not exists enquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text,
  email text,
  message text,
  created_at timestamptz default now()
);

-- Row Level Security ---------------------------------------------
alter table patients enable row level security;
alter table appointments enable row level security;
alter table enquiries enable row level security;

-- NOTE ON SECURITY MODEL
-- The admin panel is protected by a password gate stored in the website's
-- own .env file (VITE_ADMIN_PASSWORD), NOT by Supabase Auth. Because of
-- that, the same public "anon" API key is used for both the website's
-- forms and the admin panel, so RLS below allows the anon key full access.
-- Real protection comes from the admin UI being gated behind the .env
-- password. If you later want database-level protection too, reintroduce
-- Supabase Auth for the admin panel and switch these to `to authenticated`.

drop policy if exists "public can insert patients" on patients;
drop policy if exists "admin full access patients" on patients;
create policy "anon full access patients" on patients
  for all to anon using (true) with check (true);

drop policy if exists "public can insert appointments" on appointments;
drop policy if exists "admin full access appointments" on appointments;
drop policy if exists "public can update payment status" on appointments;
create policy "anon full access appointments" on appointments
  for all to anon using (true) with check (true);

drop policy if exists "public can insert enquiries" on enquiries;
drop policy if exists "admin full access enquiries" on enquiries;
create policy "anon full access enquiries" on enquiries
  for all to anon using (true) with check (true);
