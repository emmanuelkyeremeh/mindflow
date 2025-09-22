# 🧠 MindFlow - AI-Powered 3D Mind Mapping

Transform your ideas into stunning 3D mind maps with AI-powered expansions. Visualize, connect, and explore your thoughts in immersive three-dimensional space.

## ✨ Features

- **🧠 AI-Powered Expansion**: Let DeepSeek AI suggest related concepts automatically
- **🌐 3D Visualization**: Navigate your ideas in stunning 3D space with Three.js
- **🔗 Smart Connections**: Brain.js clusters related concepts to avoid repetitive suggestions
- **💾 Cloud Sync**: Automatic Firebase sync - access your maps anywhere, anytime
- **📤 Export Options**: Share as PNG images, PDF documents, or JSON files
- **⚡ Real-time Updates**: Smooth animations and responsive interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **3D Graphics**: Three.js + React Three Fiber
- **AI**: OpenRouter + DeepSeek model
- **Backend**: Firebase (Firestore + Authentication)
- **Styling**: CSS with vibrant gradients and animations
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project
- OpenRouter API key

### Installation

1. **Clone and setup**:
   ```bash
   cd mindflow
   ./setup.sh
   ```

2. **Configure environment**:
   ```bash
   # Copy and edit environment variables
   cp example.env .env.local
   ```

3. **Update Firebase project**:
   ```bash
   # Edit .firebaserc with your Firebase project ID
   nano .firebaserc
   ```

4. **Start development**:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env.local` file with these variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-firebase-app-id

# OpenRouter Configuration
VITE_OPENROUTER_API_KEY=your-openrouter-api-key

# Site Information
VITE_SITE_URL=https://mindflow.vercel.app
VITE_SITE_NAME=MindFlow

# Business Rules
VITE_FREE_MAPS_LIMIT=5
VITE_PREMIUM_MAPS_LIMIT=-1

# Pricing (for future implementation)
VITE_PREMIUM_PRICE_USD=5
VITE_PREMIUM_PRICE_GHS=20
```

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password + Google)
4. Enable Firestore Database

### 2. Deploy Firestore Rules

```bash
./deploy-firebase.sh
```

### 3. Firestore Collections

The app uses these collections:

- **users**: User profiles and subscription data
- **mindmaps**: User mind maps with nodes and edges
- **admin**: Admin-only data (superuser access)
- **analytics**: Usage analytics (superuser access)

## 🎨 Design System

### Color Palette

- **Coral**: `#FF6B6B` - Primary accent
- **Teal**: `#4ECDC4` - Secondary accent  
- **Blue**: `#45B7D1` - Info and links
- **Mint**: `#96CEB4` - Success states
- **Yellow**: `#FFEAA7` - Highlights
- **Purple**: `#667EEA` - Gradients

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 400, 500, 600, 700, 800

## 📱 Responsive Design

- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts for all screen sizes
- Consistent spacing and typography

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Firebase Hosting (Alternative)

```bash
npm run build
firebase deploy --only hosting
```

## 🔐 Security

- **Firestore Rules**: User data isolation
- **Authentication**: Firebase Auth with email/password and Google
- **API Security**: OpenRouter API key protection
- **Input Validation**: Client and server-side validation

## 📊 User Limits

- **Free Plan**: 5 mind maps maximum
- **Premium Plan**: Unlimited mind maps (₵20/month)

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Project Structure

```
src/
├── components/          # React components
│   ├── Auth.jsx        # Authentication
│   ├── Dashboard.jsx   # Main dashboard
│   ├── LandingPage.jsx # Landing page
│   └── MindFlowLogo.jsx # Logo component
├── config/             # Configuration files
│   ├── firebase.js     # Firebase config
│   ├── openrouter.js   # OpenRouter API
│   └── brain.js        # Brain.js setup
├── firebase/           # Firebase services
│   └── auth.js         # Authentication functions
├── services/           # Business logic
│   └── mindmapService.js # Mind map operations
└── utils/              # Utility functions
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Email**: emmanuelkyeremeh@gmail.com
- **Issues**: GitHub Issues
- **Documentation**: This README

## 🔮 Roadmap

- [ ] 3D mind map editor implementation
- [ ] AI node expansion integration
- [ ] Payment system (Paystack)
- [ ] Advanced export options
- [ ] Collaboration features
- [ ] Mobile app

---

Made with ❤️ by the MindFlow Team