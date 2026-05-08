import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, Target, TrendingUp, Sparkles } from 'lucide-react';

const Landing = () => {
  return (
    <div className="pt-10 pb-24">
      {/* Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto pt-20 sm:pt-32">
        <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-brand-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
          <Sparkles className="w-4 h-4 text-brand-500" />
          <span className="text-sm font-semibold text-brand-700">Powered by Gemini AI 2.5 Flash</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8 leading-tight">
          Level up your career with <span className="gradient-text">AI Precision</span>
        </h1>
        
        <p className="mt-6 text-xl leading-relaxed text-gray-600 max-w-2xl mx-auto mb-10">
          Upload your resume, select your target role, and let our AI analyze your skills. Get a personalized roadmap and project ideas to land your next job faster.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="btn-primary w-full sm:w-auto">
            Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <a href="#features" className="btn-secondary w-full sm:w-auto">
            See how it works
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mt-32 sm:mt-40">
        <div className="text-center mb-16">
          <h2 className="text-base font-bold tracking-widest uppercase text-brand-600 mb-3">Accelerate Growth</h2>
          <p className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to upskill
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-500 transition-colors duration-300">
              <BrainCircuit className="h-7 w-7 text-brand-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Extraction</h3>
            <p className="text-gray-600 leading-relaxed">Our advanced AI instantly parses your resume to identify your core competencies and technical skills with high accuracy.</p>
          </div>

          <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-accent-light rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
              <Target className="h-7 w-7 text-accent-dark group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Gap Identification</h3>
            <p className="text-gray-600 leading-relaxed">Compare your profile against industry standards for specific roles to find exactly what technologies you're missing.</p>
          </div>

          <div className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors duration-300">
              <TrendingUp className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Actionable Roadmaps</h3>
            <p className="text-gray-600 leading-relaxed">Get week-by-week learning plans and real-world project suggestions to bridge your skill gap effectively and land the job.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
