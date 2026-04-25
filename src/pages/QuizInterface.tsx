import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Timer, 
  HelpCircle,
  Trophy,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

const QuizInterface = () => {
  const { addXp, saveQuizResult } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What is the primary function of the Input Layer in a Neural Network?",
      options: [
        "To perform complex mathematical calculations",
        "To receive raw data and pass it to the network",
        "To produce the final prediction",
        "To adjust the weights and biases"
      ],
      correct: 1,
      explanation: "The input layer is responsible for receiving external data and formatting it correctly before it passes through hidden layers for processing."
    },
    {
      question: "Which biological part of the brain is a 'Neuron' in AI modeled after?",
      options: [
        "Skull",
        "Nerve Cell",
        "Blood Vessel",
        "Muscle Fiber"
      ],
      correct: 1,
      explanation: "Artificial neurons are mathematical models inspired by biological neurons (nerve cells) that transmit signals in the brain."
    }
  ];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      addXp(100);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      saveQuizResult('Logic', (score / questions.length) * 100);
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background p-8">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-10 border border-border shadow-premium text-center"
        >
          <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-warning" />
          </div>
          <h2 className="text-3xl font-bold text-text-primary">Quiz Complete!</h2>
          <p className="text-text-secondary mt-2">Amazing job, you've mastered this topic.</p>
          
          <div className="my-8 grid grid-cols-2 gap-4">
            <div className="bg-background rounded-2xl p-4">
              <p className="text-xs font-bold text-text-secondary uppercase">Score</p>
              <p className="text-2xl font-bold text-primary">{score}/{questions.length}</p>
            </div>
            <div className="bg-background rounded-2xl p-4">
              <p className="text-xs font-bold text-text-secondary uppercase">XP Earned</p>
              <p className="text-2xl font-bold text-accent">+{score * 100} XP</p>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full btn-primary py-4"
          >
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background flex flex-col p-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto w-full">
        <header className="mb-12 flex items-center justify-between">
          <div className="flex-1 pr-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-text-secondary">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-xs font-bold text-primary">Unit: Neural Architecture</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-border shadow-soft">
            <Timer className="w-4 h-4 text-text-secondary" />
            <span className="text-sm font-mono font-bold">14:02</span>
          </div>
        </header>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-text-primary leading-tight">
            {questions[currentQuestion].question}
          </h2>

          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={`p-6 rounded-2xl border-2 text-left transition-all relative group overflow-hidden ${
                  isAnswered 
                    ? index === questions[currentQuestion].correct
                      ? 'border-accent bg-accent/5'
                      : index === selectedOption
                        ? 'border-error bg-error/5'
                        : 'border-border opacity-50'
                    : 'border-border hover:border-primary hover:bg-primary/5 active:scale-[0.99]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    isAnswered && index === questions[currentQuestion].correct
                      ? 'bg-accent text-white'
                      : isAnswered && index === selectedOption
                        ? 'bg-error text-white'
                        : 'bg-background text-text-secondary'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className={`font-semibold ${
                    isAnswered && index === questions[currentQuestion].correct
                      ? 'text-accent'
                      : isAnswered && index === selectedOption
                        ? 'text-error'
                        : 'text-text-primary'
                  }`}>{option}</span>
                </div>
                {isAnswered && index === questions[currentQuestion].correct && (
                  <CheckCircle2 className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-accent" />
                )}
                {isAnswered && index === selectedOption && index !== questions[currentQuestion].correct && (
                  <XCircle className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-error" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 border border-border shadow-soft"
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-primary" />
                  AI Feedback
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {questions[currentQuestion].explanation}
                </p>
                <button 
                  onClick={nextQuestion}
                  className="mt-6 w-full btn-primary flex items-center justify-center gap-2"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;
