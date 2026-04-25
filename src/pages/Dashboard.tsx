import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  CheckCircle2, 
  AlertCircle,
  PlayCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';
import { useStore } from '../store';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { name, xp, streak, currentModule, analytics, progress } = useStore();

  const currentModuleProgress = currentModule ? (progress[currentModule] || 0) : 0;

  const skillData = analytics.skills.map(s => ({
    subject: s.subject,
    A: s.score,
    fullMark: 150
  }));

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-background">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Welcome back, {name.split(' ')[0]}! 👋</h1>
        <p className="text-text-secondary mt-1">You've hit your learning goals {streak} days in a row. Keep it up!</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total XP', value: xp, icon: Star, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Current Streak', value: `${streak} Days`, icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Time Today', value: '1h 24m', icon: Clock, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Goal Progress', value: '75%', icon: Target, color: 'text-secondary', bg: 'bg-secondary/10' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-white p-6 rounded-xl border border-border shadow-soft group hover:shadow-premium transition-all"
          >
            <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-border shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-text-primary flex items-center gap-2">
              Learning Activity <span className="text-xs font-normal text-text-secondary">(Mins/Day)</span>
            </h3>
            <select className="text-xs font-medium border-border rounded-md bg-background px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.weeklyActivity}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                />
                <Area type="monotone" dataKey="time" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorTime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Analysis */}
        <div className="bg-white p-6 rounded-xl border border-border shadow-soft">
          <h3 className="font-bold text-text-primary mb-6">Strength Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748B' }} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Module & Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-soft border-l-4 border-l-primary">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">In Progress</span>
                <h3 className="text-xl font-bold text-text-primary mt-2">{currentModule?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</h3>
                <p className="text-sm text-text-secondary mt-1">Next up: Backpropagation & Optimization Functions</p>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${currentModuleProgress}%` }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <span className="text-sm font-bold text-text-primary">{currentModuleProgress}%</span>
                </div>
              </div>
              <button className="bg-primary text-white p-4 rounded-xl shadow-lg hover:bg-secondary transition-all transform hover:scale-105 active:scale-95">
                <PlayCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-border">
              <h4 className="font-bold text-sm mb-4">Recommended for you</h4>
              <div className="space-y-3">
                {[
                  { title: 'Vector Calculus for AI', time: '12m', level: 'Intermediate' },
                  { title: 'Python Data Structures', time: '8m', level: 'Beginner' }
                ].map(item => (
                  <div key={item.title} className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition-colors cursor-pointer group">
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-[10px] text-text-secondary">{item.time} • {item.level}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl border border-border">
              <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                Weak Points <AlertCircle className="w-4 h-4 text-warning" />
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-warning/5 rounded-lg border border-warning/10">
                  <p className="text-xs font-bold text-warning uppercase">Recursive Functions</p>
                  <p className="text-xs text-text-primary mt-1">Scored 40% in last quiz. Try the "Simpler" mode.</p>
                </div>
                <button className="w-full text-xs font-bold text-primary py-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                  Review Concept
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Milestones */}
        <div className="bg-white p-6 rounded-xl border border-border shadow-soft h-fit">
          <h3 className="font-bold text-text-primary mb-4">Recent Milestones</h3>
          <div className="space-y-6">
            {[
              { title: 'Fast Learner', desc: 'Completed 3 units in one day', date: '2d ago', status: 'completed' },
              { title: 'Perfect Quiz', desc: 'Got 100% in React Quiz', date: '4d ago', status: 'completed' },
              { title: 'Consistent', desc: 'Log in for 7 days straight', date: 'Ongoing', status: 'pending' },
            ].map((milestone, i) => (
              <div key={milestone.title} className="flex gap-3 relative">
                {i !== 2 && <div className="absolute top-8 left-4 bottom-[-16px] w-[2px] bg-border" />}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-accent/10' : 'bg-gray-100'
                }`}>
                  {milestone.status === 'completed' 
                    ? <CheckCircle2 className="w-4 h-4 text-accent" /> 
                    : <div className="w-2 h-2 bg-text-secondary rounded-full" />
                  }
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">{milestone.title}</p>
                  <p className="text-xs text-text-secondary">{milestone.desc}</p>
                  <p className="text-[10px] font-medium text-text-secondary mt-1">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
