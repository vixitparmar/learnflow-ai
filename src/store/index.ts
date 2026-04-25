import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  summary?: string;
  timestamp: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Quiz {
  id: string;
  topic: string;
  questions: QuizQuestion[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface UserState {
  name: string;
  xp: number;
  level: 'Learner' | 'Pro' | 'Master';
  streak: number;
  completedModules: string[];
  currentModule: string | null;
  progress: Record<string, number>;
  notes: Note[];
  quizzes: Quiz[];
  analytics: {
    weeklyActivity: { day: string, time: number }[];
    skills: { subject: string, score: number }[];
  };
  addXp: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  updateProgress: (moduleId: string, value: number) => void;
  setCurrentModule: (moduleId: string | null) => void;
  addNote: (note: Omit<Note, 'id' | 'timestamp'>) => void;
  updateNoteSummary: (id: string, summary: string) => void;
  saveQuizResult: (topic: string, score: number) => void;
}

export const useStore = create<UserState>((set) => ({
  name: 'Alex Johnson',
  xp: 1250,
  level: 'Learner',
  streak: 5,
  completedModules: ['intro-to-ai'],
  currentModule: 'neural-networks-101',
  progress: {
    'neural-networks-101': 45,
    'javascript-basics': 100,
    'react-advanced': 15,
  },
  notes: [
    { id: '1', title: 'Gradient Descent', content: 'Gradient descent is an optimization algorithm...', timestamp: Date.now() - 86400000 }
  ],
  quizzes: [],
  analytics: {
    weeklyActivity: [
      { day: 'Mon', time: 45 },
      { day: 'Tue', time: 30 },
      { day: 'Wed', time: 65 },
      { day: 'Thu', time: 50 },
      { day: 'Fri', time: 80 },
      { day: 'Sat', time: 40 },
      { day: 'Sun', time: 95 },
    ],
    skills: [
      { subject: 'Logic', score: 120 },
      { subject: 'Memory', score: 98 },
      { subject: 'Coding', score: 86 },
      { subject: 'Theory', score: 99 },
      { subject: 'Scenario', score: 85 },
    ]
  },
  addXp: (amount) => set((state) => {
    const newXp = state.xp + amount;
    let newLevel = state.level;
    if (newXp > 5000) newLevel = 'Master';
    else if (newXp > 2500) newLevel = 'Pro';
    return { xp: newXp, level: newLevel };
  }),
  completeModule: (moduleId) => set((state) => ({
    completedModules: [...state.completedModules, moduleId],
    progress: { ...state.progress, [moduleId]: 100 }
  })),
  updateProgress: (moduleId, value) => set((state) => ({
    progress: { ...state.progress, [moduleId]: value }
  })),
  setCurrentModule: (moduleId) => set({ currentModule: moduleId }),
  addNote: (note) => set((state) => ({
    notes: [
      { ...note, id: Math.random().toString(36).substring(7), timestamp: Date.now() },
      ...state.notes
    ]
  })),
  updateNoteSummary: (id, summary) => set((state) => ({
    notes: state.notes.map(n => n.id === id ? { ...n, summary } : n)
  })),
  saveQuizResult: (topic, score) => set((state) => {
    // Update skill based on topic
    const newSkills = state.analytics.skills.map(s => 
      s.subject.toLowerCase() === topic.toLowerCase() 
        ? { ...s, score: Math.min(150, s.score + score) }
        : s
    );
    return { 
      xp: state.xp + (score * 10),
      analytics: { ...state.analytics, skills: newSkills }
    };
  }),
}));

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  difficulty?: 'simple' | 'intermediate' | 'advanced';
}

interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => string;
  updateMessage: (id: string, content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: "Hi Alex! I'm your LearnFlow assistant. What would you like to dive into today?",
      timestamp: Date.now(),
    }
  ],
  isTyping: false,
  addMessage: (message) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id,
          timestamp: Date.now(),
        }
      ]
    }));
    return id;
  },
  updateMessage: (id, content) => set((state) => ({
    messages: state.messages.map(msg => 
      msg.id === id ? { ...msg, content: msg.content + content } : msg
    )
  })),
  setIsTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ 
    messages: [{
      id: '1',
      role: 'assistant',
      content: "Hi Alex! I'm your LearnFlow assistant. What would you like to dive into today?",
      timestamp: Date.now(),
    }]
  }),
}));
