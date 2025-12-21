-- Remove the foreign key constraint that links profiles to auth.users
-- This allows creating profiles with random IDs for the MVP without requiring a real user account
alter table profiles drop constraint profiles_id_fkey;
