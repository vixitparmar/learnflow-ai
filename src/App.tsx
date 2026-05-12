import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AIAssistant from './components/AIAssistant';
import Dashboard from './pages/Dashboard';
import LearningModule from './pages/LearningModule';
import QuizInterface from './pages/QuizInterface';
import NotesPage from './pages/NotesPage';
import LandingPage from './pages/LandingPage';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, BookOpen } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle Get Started from Landing
  const handleGetStarted = () => setActiveTab('dashboard');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    closeSidebar();
  };

  if (activeTab === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'learning': return <LearningModule />;
      case 'quizzes': return <QuizInterface />;
      case 'notes': return <NotesPage />;
      case 'ai-tutor': return <AIAssistant isFullPage />;
      case 'analytics': return <Dashboard />; // Reuse or create separate
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans relative">
      {/* Sidebar - Desktop: Fixed, Mobile: Drawer */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
      />
      
      {/* Backdrop for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="text-white w-5 h-5" />
            </div>
            <h1 className="text-lg font-bold text-text-primary tracking-tight">LearnFlow <span className="text-primary">AI</span></h1>
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden">
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
          {activeTab !== 'quizzes' && activeTab !== 'ai-tutor' && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              className="hidden xl:block"
            >
              <AIAssistant />
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
