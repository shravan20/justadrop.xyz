#!/bin/bash

echo "🌊 To setup Just A Drop Setup Script 🌊"
echo "----------------------------------------"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "https://nodejs.org/en/download"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    echo "https://nodejs.org/en/download"
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    touch .env
fi

echo "📝 Let's set up your Supabase configuration"
echo "----------------------------------------"
echo "You can find these values in your Supabase project settings"
echo ""

read -p "Enter your Supabase URL: " supabase_url
while [ -z "$supabase_url" ]; do
    echo "❌ Supabase URL cannot be empty"
    read -p "Enter your Supabase URL: " supabase_url
done

read -p "Enter your Supabase Anon Key: " supabase_anon_key
while [ -z "$supabase_anon_key" ]; do
    echo "❌ Supabase Anon Key cannot be empty"
    read -p "Enter your Supabase Anon Key: " supabase_anon_key
done

echo "VITE_SUPABASE_URL=$supabase_url" > .env
echo "VITE_SUPABASE_ANON_KEY=$supabase_anon_key" >> .env

echo ""
echo "✅ Environment variables have been set"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🎉 Setup completed successfully!"
echo "----------------------------------------"
echo "You can now start the development server with: npm run dev"
echo "Visit http://localhost:8080 to see your application"
echo ""
echo "Test accounts available:"
echo "- Admin: admin@justadrop.org"
echo "- Volunteer: volunteer@justadrop.org"
echo "- NGO: ngo@justadrop.org"
echo "Password for all accounts: password"