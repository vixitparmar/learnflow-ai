import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Star, 
  Download, 
  MoreVertical,
  Clock,
  BookMarked,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

const NotesPage = () => {
  const { notes, addNote, updateNoteSummary } = useStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content) return;
    addNote({
      title: newNote.title,
      content: newNote.content,
    });
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const handleSummarize = (id: string, content: string) => {
    // Mock AI summary
    const summary = content.substring(0, 100) + "... (Summarized by LearnFlow AI)";
    updateNoteSummary(id, summary);
  };

  return (
    <div className="flex-1 bg-background p-4 md:p-8 overflow-y-auto">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-10 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Smart Notes</h1>
          <p className="text-text-secondary mt-1 text-sm">AI-powered insights from your learning journey.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-text-primary border border-border px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Note
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-2xl border border-primary/20 shadow-premium mb-8"
          >
            <input 
              type="text"
              placeholder="Note Title"
              className="w-full text-xl font-bold mb-4 focus:outline-none"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <textarea 
              placeholder="Start writing..."
              className="w-full h-32 text-text-primary focus:outline-none resize-none"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsAdding(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateNote}
                className="btn-primary"
              >
                Save Note
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-3">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search across all notes..."
              className="w-full bg-white border border-border rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-soft"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={note.id} 
                className="bg-white p-6 rounded-2xl border border-border shadow-soft group hover:border-primary transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">{note.title}</h3>
                        <p className="text-xs text-text-secondary">{new Date(note.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-background rounded-lg">
                      <MoreVertical className="w-5 h-5 text-text-secondary" />
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {note.summary || note.content.substring(0, 150) + "..."}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {!note.summary ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSummarize(note.id, note.content);
                      }}
                      className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" /> AI Summarize
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-accent bg-accent/5 px-2 py-1 rounded">AI Summarized</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-soft">
            <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" /> Recent Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {['AI', 'React', 'Calculus', 'UX Design', 'Node.js'].map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1.5 bg-background border border-border rounded-full hover:bg-primary/5 hover:border-primary/20 cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-secondary p-6 rounded-2xl text-white shadow-premium relative overflow-hidden">
            <BookMarked className="absolute top-[-10px] right-[-10px] w-24 h-24 opacity-10 rotate-12" />
            <h4 className="font-bold mb-2">Revision Mode</h4>
            <p className="text-xs text-white/80 mb-6">Get personalized flashcards based on your notes.</p>
            <button className="w-full bg-white text-primary text-xs font-bold py-3 rounded-xl hover:bg-opacity-90 transition-all shadow-lg">
              Start Revision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
