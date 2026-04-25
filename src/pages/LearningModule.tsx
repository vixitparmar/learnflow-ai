import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Lightbulb, 
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

const LearningModule = () => {
  const { currentModule, updateProgress, addXp } = useStore();
  const [difficulty, setDifficulty] = useState<'simple' | 'intermediate' | 'advanced'>('intermediate');

  const handleContinue = () => {
    if (currentModule) {
      updateProgress(currentModule, 100);
      addXp(200);
    }
  };

  const content = {
    simple: {
      title: "Think of Neural Networks like a stack of Filters",
      text: "Imagine you have a box of mixed fruits. You want to sort them. A neural network is like a series of sieves or filters. The first layer might look for color, the second for size, and the third for shape until you correctly identify an orange!",
      visual: "🍒 🍊 🍎 → [Color Filter] → [Shape Filter] → 🍊"
    },
    intermediate: {
      title: "Artificial Neural Networks: The Layers",
      text: "Neural Networks are inspired by the human brain. They consist of input layers, hidden layers, and output layers. Each 'neuron' in a layer connects to all neurons in the next one, passing information through mathematical weights and biases.",
      visual: "Input → (Hidden Layer) → (Hidden Layer) → Output"
    },
    advanced: {
      title: "Universal Approximation & Gradient Descent",
      text: "At their core, NNs are universal function approximators. Through backpropagation and gradient descent, the network minimizes a loss function by adjusting the partial derivatives of weights across multiple connected tensors.",
      visual: "f(x) = σ(W * a + b)"
    }
  };

  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="max-w-4xl mx-auto p-12">
        <header className="flex items-center justify-between mb-12">
          <button className="flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Roadmap
          </button>
          <div className="flex items-center bg-background rounded-xl p-1 gap-1">
            {(['simple', 'intermediate', 'advanced'] as const).map(level => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  difficulty === level 
                    ? 'bg-white text-primary shadow-sm border border-border' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </header>

        <motion.div
          key={difficulty}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-text-primary leading-tight">
              {content[difficulty].title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="w-4 h-4" /> 12 min read
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Layers className="w-4 h-4" /> Unit 4: Architecture
              </span>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-xl text-text-secondary leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              {content[difficulty].text}
            </p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10 relative group overflow-hidden">
            <div className="absolute top-4 right-4">
              <Maximize2 className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
            </div>
            <h4 className="flex items-center gap-2 text-sm font-bold text-primary mb-6">
              <Lightbulb className="w-4 h-4" /> Visual Conceptualization
            </h4>
            <div className="h-48 flex items-center justify-center bg-white rounded-xl shadow-sm border border-border font-mono text-lg text-primary p-6 text-center">
              {content[difficulty].visual}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="p-6 bg-background rounded-xl border border-border hover:border-primary transition-all cursor-pointer group">
              <h5 className="font-bold text-text-primary mb-2 flex justify-between items-center">
                Interactive Card: The Neuron
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </h5>
              <p className="text-sm text-text-secondary">Flip to see how a single neuron processes an input signal.</p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border hover:border-primary transition-all cursor-pointer group">
              <h5 className="font-bold text-text-primary mb-2 flex justify-between items-center">
                Summary Sheet
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
              </h5>
              <p className="text-sm text-text-secondary">Key takeaways for quick revision before the quiz.</p>
            </div>
          </div>
        </motion.div>

        <footer className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <div className="flex gap-2">
            <button className="btn-secondary">
              Review Previous
            </button>
            <button className="flex items-center gap-2 text-primary font-bold px-6 py-2 hover:bg-primary/5 rounded-lg transition-colors">
              <Lightbulb className="w-4 h-4" /> Need simpler?
            </button>
          </div>
          <button 
            onClick={handleContinue}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Quiz <ChevronRight className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LearningModule;
