# LearnFlow AI 🧠

LearnFlow AI is a modern, production-ready intelligent learning assistant that helps users master concepts effectively with personalized adaptive content.

## 🚀 Key Features

- **Personalized Dashboard**: Track your XP, streaks, and learning progress with beautiful interactive charts.
- **AI Tutor**: Real-time chat assistant that can simplify complex topics and read explanations aloud.
- **Adaptive Learning Path**: Content difficulty adjusts based on your performance.
- **Smart Quizzes**: Dynamically generated quizzes with AI feedback.
- **Analytics**: Deep insights into your strengths and weaknesses.
- **Smart Notes**: Save your thoughts and let AI summarize them for quick revision.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Groq SDK / OpenAI API

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd learnflow-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## 🐳 Docker Support

To run the application using Docker:

1. Build the image:
   ```bash
   docker build -t learnflow-ai .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 learnflow-ai
   ```

The app will be available at `http://localhost:3000`.

## 🚀 Deployment to Google Cloud Run

1. Authenticate with Google Cloud:
   ```bash
   gcloud auth login
   ```

2. Configure your project:
   ```bash
   gcloud config set project [YOUR_PROJECT_ID]
   ```

3. Build and submit your container image to Artifact Registry:
   ```bash
   gcloud builds submit --tag gcr.io/[YOUR_PROJECT_ID]/learnflow-ai
   ```

4. Deploy to Cloud Run:
   ```bash
   gcloud run deploy learnflow-ai \
     --image gcr.io/[YOUR_PROJECT_ID]/learnflow-ai \
     --platform managed \
     --region [YOUR_REGION] \
     --allow-unauthenticated
   ```

---

Built with ❤️ by LearnFlow Team
