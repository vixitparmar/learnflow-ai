/**
 * Intelligence Logic for LearnFlow AI
 * This module handles difficulty adaptation and personalized recommendations.
 */

export interface UserPerformance {
  accuracy: number;
  timeSpent: number;
  topicEngagement: number;
}

export const calculateNextDifficulty = (currentDifficulty: string, performance: UserPerformance): 'simple' | 'intermediate' | 'advanced' => {
  const { accuracy, timeSpent, topicEngagement } = performance;
  
  // Scoring algorithm (0-100)
  const score = (accuracy * 0.6) + (topicEngagement * 0.3) - (Math.min(timeSpent / 600, 1) * 10);

  if (score > 80) return 'advanced';
  if (score > 50) return 'intermediate';
  return 'simple';
};

export const recommendNextTopic = (completedTopics: string[], skillStrengths: Record<string, number>) => {
  const allTopics = [
    { id: 'vector-calculus', name: 'Vector Calculus for AI', category: 'Math', level: 'intermediate' },
    { id: 'python-data-structures', name: 'Python Data Structures', category: 'Coding', level: 'beginner' },
    { id: 'backpropagation', name: 'Backpropagation & Optimization', category: 'Theory', level: 'advanced' },
    { id: 'tensors-101', name: 'Tensors 101', category: 'Math', level: 'beginner' },
    { id: 'gradient-descent-deep', name: 'Deep Dive into Gradient Descent', category: 'Math', level: 'advanced' }
  ];

  // Simple scoring: prioritize topics in categories where skill is low, and that aren't completed
  const uncompleted = allTopics.filter(t => !completedTopics.includes(t.id));
  
  const scored = uncompleted.map(topic => {
    const skillScore = skillStrengths[topic.category] || 50;
    return {
      ...topic,
      priority: 100 - skillScore // Lower skill means higher priority
    };
  });

  return scored.sort((a, b) => b.priority - a.priority)[0];
};

export const generateMockQuiz = (topic: string, difficulty: 'simple' | 'intermediate' | 'advanced') => {
  const banks: Record<string, any[]> = {
    'neural-networks': [
      {
        question: "What is the simplest form of a neural network?",
        options: ["CNN", "Perceptron", "RNN", "LSTM"],
        correct: 1,
        explanation: "The Perceptron is the most basic unit and the simplest form of a neural network.",
        difficulty: 'simple'
      },
      {
        question: "What does the activation function σ do?",
        options: ["Adds weights", "Normalizes output", "Introduces non-linearity", "Reduces bias"],
        correct: 2,
        explanation: "Activation functions like ReLU or Sigmoid introduce non-linearity, allowing NNs to learn complex patterns.",
        difficulty: 'intermediate'
      },
      {
        question: "What is vanishing gradient problem?",
        options: ["Weights become zero", "Gradients become too small during backprop", "Loss function stops working", "Training data is lost"],
        correct: 1,
        explanation: "In deep networks, gradients can become extremely small as they are multiplied back through layers, preventing weights from updating meaningfully.",
        difficulty: 'advanced'
      }
    ]
  };

  const bank = banks[topic] || banks['neural-networks'];
  return bank.filter(q => q.difficulty === difficulty || difficulty === 'intermediate');
};
