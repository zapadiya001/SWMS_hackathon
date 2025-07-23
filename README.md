# ♻️ SWMS — Smart Waste Management System 

SWMS is a full-stack, AI-powered platform that promotes sustainable waste management through smart classification, eco-education, and gamified incentives. Built during a 24-hour hackathon to address environmental sustainability challenges.

## 🌟 Key Highlights

- **🤖 AI-Powered Classification**: ViT Transformer model for accurate waste type identification
- **💬 Intelligent Suggestions**: Gemini AI provides personalized eco-friendly disposal recommendations  
- **🎮 Gamified Learning**: Interactive quizzes, educational videos, and reward system
- **📍 Location Services**: Real-time garbage collection point finder
- **💳 Integrated Payments**: Razorpay integration for eco-friendly product purchases
- **🏆 Achievement System**: Earn eco-points for sustainable actions

---

## 🚀 What SWMS Does

### For Users
- 📷 **Snap & Classify**: Upload images of waste items for instant AI-powered classification
- 💡 **Smart Suggestions**: Get personalized, nature-friendly disposal and reuse recommendations
- 🧠 **Learn & Grow**: Access educational content through videos, quizzes, and eco-tips
- 📍 **Find Collection Points**: Locate nearby garbage collection and recycling centers
- 🪙 **Earn Rewards**: Accumulate eco-points for sustainable actions and redeem benefits

### For the Environment
- ♻️ Promotes proper waste segregation and disposal
- 🌱 Encourages creative reuse and upcycling of materials
- 📚 Educates users about environmental sustainability
- 🌍 Reduces environmental impact through informed decision-making

---

## 🏗️ Project Architecture

```
swms/
├── 📱 swms-frontend/        # React frontend (Vite + Tailwind CSS)
│   ├── src/components/      # Reusable UI components
│   ├── src/pages/          # Application pages
│   ├── src/services/       # API integration services
│   └── src/utils/          # Helper functions
├── 🔧 swms-backend/        # Express.js backend server
│   ├── controllers/        # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── middleware/        # Authentication & validation
│   └── routes/            # API endpoints
└── 🧠 swms-model/          # FastAPI AI microservice
    ├── models/            # ML model implementations
    ├── services/          # AI processing services
    └── utils/             # Model utilities
```

---

## 🔧 Quick Setup

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB
- Git

### 1️⃣ Clone & Navigate
```bash
git clone https://github.com/your-username/swms.git
cd swms
```

### 2️⃣ Frontend Setup
```bash
cd swms-frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 3️⃣ AI Model Service
```bash
cd swms-model
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux  
source venv/bin/activate

pip install -r requirements.txt

# Create .env file
echo "GOOGLE_API_KEY=your_google_api_key" > .env

uvicorn main:app --reload
# Runs on http://localhost:8000
```

### 4️⃣ Backend Server
```bash
cd swms-backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EOF

npm run dev
# Runs on http://localhost:5000
```

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend  
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Razorpay** - Payment gateway integration

### AI/ML
- **FastAPI** - High-performance API framework
- **HuggingFace Transformers** - Vision Transformer (ViT) model
- **LangChain** - LLM integration framework
- **Google Gemini AI** - Conversational AI
- **OpenCV** - Image processing

## ✨ Key Features Deep Dive

### 🤖 AI Classification System
- Utilizes Vision Transformer (ViT) for high-accuracy waste classification
- Supports multiple waste categories: plastic, paper, metal, organic, electronic
- Real-time image processing with confidence scores

### 💬 Intelligent Chat Assistant
- Powered by Google Gemini AI through LangChain
- Provides context-aware disposal suggestions
- Offers creative reuse and upcycling ideas
- Supports natural language interactions

### 🎮 Gamification Engine
- Dynamic point system for user engagement
- Achievement badges and milestones
- Interactive educational quizzes
- Leaderboards and social features

### 📍 Location Services
- Integration with mapping APIs
- Real-time collection point discovery
- Distance calculation and routing
- Facility details and operating hours

---

## 🎯 Hackathon Journey

This project was conceived and built during an intense 24-hour hackathon focused on environmental sustainability. Our team tackled the challenge of making waste management more accessible and engaging through technology.

### What We Accomplished:
- ✅ Full-stack application with AI integration
- ✅ Real-time image classification system
- ✅ Interactive user interface with gamification
- ✅ Payment gateway integration
- ✅ Educational content management system

### Challenges Overcome:
- 🔧 Integrating multiple AI services efficiently
- 🎨 Creating intuitive UX under time constraints
- 🔗 Coordinating between three different tech stacks
- 📊 Implementing real-time data synchronization

---


## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and collaborative

---

## 👥 Team

Built with ❤️ during a 24-hour hackathon by passionate developers committed to environmental sustainability.

- **Haresh Zapadiya** - Team leader and fullstack dev
- **Pujan Ajmera** - AI/ML Engineering and Researcher 
- **Deven Macchar** - Backend Development
- **Vishal Baraiya** - Backend Development
- **Dhairya Bhatt** - Frontend Development
- **Dhruvrajsing Zala** - Frontend dev and Researcher

---

## 🙏 Acknowledgments

- HuggingFace for providing pre-trained Vision Transformer models
- Google for Gemini AI API access
- MongoDB for database services
- Razorpay for payment gateway integration
- The hackathon organizers for the amazing experience
- Our mentors and judges for valuable feedback

<div align="center">

**🌍 Making the world a greener place, one smart decision at a time! 🌱**

[⭐ Star this repository](https://github.com/zapadiya001/SWMS) if you found it helpful!

</div>