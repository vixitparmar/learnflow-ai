import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Trophy,
  Zap,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useStore } from '../store';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  onClose 
}: { 
  activeTab: string, 
  setActiveTab: (tab: string) => void,
  isOpen: boolean,
  onClose: () => void
}) => {
  const { name, level, streak } = useStore();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'learning', icon: BookOpen, label: 'Learning Path' },
    { id: 'quizzes', icon: Zap, label: 'Quizzes' },
    { id: 'ai-tutor', icon: Sparkles, label: 'AI Tutor' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'notes', icon: FileText, label: 'Notes' },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border h-screen flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-text-primary tracking-tight">LearnFlow <span className="text-primary">AI</span></h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-border">
        <div className="bg-background rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-warning" />
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{level}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-primary">{name}</span>
            <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-border shadow-sm">
              <Zap className="w-3 h-3 text-primary fill-primary" />
              <span className="text-xs font-bold">{streak}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-error hover:bg-error/5 transition-colors rounded-lg">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
