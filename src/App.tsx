import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import Dashboard from './pages/Dashboard';
import LearningModule from './pages/LearningModule';
import QuizInterface from './pages/QuizInterface';
import NotesPage from './pages/NotesPage';
import LandingPage from './pages/LandingPage';
import { AnimatePresence, motion } from 'framer-motion';

const App = () => {
  const [activeTab, setActiveTab] = useState('landing');

  // Handle Get Started from Landing
  const handleGetStarted = () => setActiveTab('dashboard');

  if (activeTab === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'learning': return <LearningModule />;
      case 'quizzes': return <QuizInterface />;
      case 'notes': return <NotesPage />;
      case 'analytics': return <Dashboard />; // Reuse or create separate
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-w-0 overflow-hidden"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Conditional AI Assistant Visibility */}
        {activeTab !== 'quizzes' && (
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            className="hidden xl:block"
          >
            <AIAssistant />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default App;
