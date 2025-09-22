#!/bin/bash

# MindFlow Firebase Deployment Script
echo "🚀 Deploying MindFlow to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
fi

# Deploy Firestore rules and indexes
echo "📋 Deploying Firestore rules and indexes..."
firebase deploy --only firestore:rules,firestore:indexes

if [ $? -eq 0 ]; then
    echo "✅ Firestore rules and indexes deployed successfully!"
else
    echo "❌ Firestore deployment failed!"
    exit 1
fi

echo "🎉 Firebase deployment complete!"
echo "📝 Next steps:"
echo "   1. Update .firebaserc with your actual Firebase project ID"
echo "   2. Set up your Firebase project in the Firebase Console"
echo "   3. Enable Firestore and Authentication"
echo "   4. Add your environment variables to .env.local"
