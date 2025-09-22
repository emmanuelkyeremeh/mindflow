#!/bin/bash

# MindFlow Setup Script
echo "🧠 Setting up MindFlow..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps --ignore-scripts

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies!"
    exit 1
fi

# Copy example environment file
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from example..."
    cp example.env .env.local
    echo "⚠️  Please update .env.local with your actual environment variables!"
else
    echo "📝 .env.local already exists, skipping..."
fi

# Make deployment script executable
chmod +x deploy-firebase.sh

echo "🎉 MindFlow setup complete!"
echo "📝 Next steps:"
echo "   1. Update .env.local with your Firebase and OpenRouter credentials"
echo "   2. Update .firebaserc with your Firebase project ID"
echo "   3. Run 'npm run dev' to start the development server"
echo "   4. Run './deploy-firebase.sh' to deploy Firestore rules and indexes"
