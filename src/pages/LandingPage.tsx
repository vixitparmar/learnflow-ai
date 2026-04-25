import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  Zap, 
  BarChart3, 
  Clock 
} from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <BrainCircuit className="text-white w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">LearnFlow <span className="text-primary">AI</span></h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-secondary">
          <a href="#" className="hover:text-primary transition-colors">Features</a>
          <a href="#" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="hover:text-primary transition-colors">Resources</a>
          <button 
            onClick={onGetStarted}
            className="btn-primary"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-xs font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              Revolutionizing Personal Education
            </div>
            <h1 className="text-7xl font-extrabold text-text-primary leading-[1.1] mb-6">
              Learn faster, <br />
              <span className="text-primary">powered by AI.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
              Design your personalized learning path with an AI tutor that adapts to your pace, behavior, and understanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="btn-primary px-10 py-5 text-lg flex items-center justify-center gap-3 shadow-xl shadow-primary/25"
              >
                Get Started for Free <ArrowRight className="w-6 h-6" />
              </button>
              <button className="btn-secondary px-10 py-5 text-lg">
                View Demo
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-background bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-text-secondary">
                <span className="text-text-primary">12,000+</span> students already learning
              </p>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full -z-10" />
            <div className="bg-white rounded-[32px] border border-border shadow-2xl p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <div className="h-6 w-32 bg-background rounded-full" />
              </div>
              
              <div className="space-y-6">
                <div className="h-4 w-3/4 bg-background rounded-full" />
                <div className="h-4 w-1/2 bg-background rounded-full" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-32 bg-primary/5 rounded-2xl border border-primary/10 flex flex-col items-center justify-center gap-3">
                    <Zap className="w-8 h-8 text-primary" />
                    <div className="h-2 w-12 bg-primary/20 rounded-full" />
                  </div>
                  <div className="h-32 bg-accent/5 rounded-2xl border border-accent/10 flex flex-col items-center justify-center gap-3">
                    <BarChart3 className="w-8 h-8 text-accent" />
                    <div className="h-2 w-12 bg-accent/20 rounded-full" />
                  </div>
                </div>
                <div className="h-20 bg-background rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-3/4 bg-gray-200 rounded-full" />
                    <div className="h-2 w-1/2 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Floating Micro UI */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-20 -right-4 bg-white p-4 rounded-2xl border border-border shadow-xl max-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-bold text-text-primary">Learning Goal Met!</span>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight">You masterted "Gradient Descent" today.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-4xl font-bold text-text-primary mb-4">Master any subject with ease</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">LearnFlow combines neuro-science with cutting edge AI to create the ultimate learning experience.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Adaptive Tutoring", 
              desc: "Content difficulty adjusts in real-time based on your answers and behavior.",
              icon: BrainCircuit,
              color: "text-primary"
            },
            { 
              title: "Smart Analytics", 
              desc: "Deep insights into your strength and weakness with AI-driven recommendations.",
              icon: BarChart3,
              color: "text-accent"
            },
            { 
              title: "Time Optimized", 
              desc: "Squeezes hours of study into minutes of high-intensity focus sessions.",
              icon: Clock,
              color: "text-secondary"
            }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl border border-border hover:border-primary/20 hover:bg-primary/5 transition-all group">
              <feature.icon className={`w-12 h-12 ${feature.color} mb-6 group-hover:scale-110 transition-transform`} />
              <h3 className="text-xl font-bold text-text-primary mb-4">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
