-- Drop the strict policy that requires authentication
drop policy "Users can insert their own profile." on profiles;

-- Create a new policy that allows anyone (public) to insert a profile
-- This is necessary for the registration form to work without a login step first
create policy "Enable insert for everyone" 
on profiles for insert 
with check ( true );
