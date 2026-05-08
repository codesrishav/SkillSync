import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, XCircle, BookOpen, Briefcase, ArrowLeft } from 'lucide-react';

const AnalysisResult = () => {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <Navigate to="/dashboard" />;
  }

  // Calculate colors based on gap
  const getGapColor = (gap) => {
    if (gap <= 20) return 'text-emerald-500 border-emerald-200 bg-emerald-50';
    if (gap <= 50) return 'text-amber-500 border-amber-200 bg-amber-50';
    return 'text-red-500 border-red-200 bg-red-50';
  };
  
  const gapStyle = getGapColor(result.gapPercentage);

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-fade-in-up">
        <div>
          <Link to="/dashboard" className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-brand-600 transition-colors mb-4 bg-white/50 px-3 py-1.5 rounded-full border border-gray-200">
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Analysis
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Analysis Results</h1>
          <div className="mt-3 inline-flex items-center px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100">
            <span className="text-sm font-medium text-brand-800">Target Role: <strong className="font-bold">{result.jobRole}</strong></span>
          </div>
        </div>
        
        <div className="shrink-0">
          <div className={`flex items-center justify-center w-32 h-32 rounded-full border-8 shadow-inner bg-white ${gapStyle.replace('bg-', 'border-').split(' ')[0]} ${gapStyle.split(' ')[1]}`}>
            <div className="text-center">
              <span className={`block text-3xl font-black ${gapStyle.split(' ')[0]}`}>{result.gapPercentage}%</span>
              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">Gap</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Skills */}
        <div className="lg:col-span-4 space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="glass-card p-6 border-t-4 border-t-emerald-400">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg mr-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              Extracted Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.extractedSkills?.length > 0 ? (
                result.extractedSkills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm transition-transform hover:scale-105">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">No specific skills found.</p>
              )}
            </div>
          </div>

          <div className="glass-card p-6 border-t-4 border-t-red-400">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
              <div className="p-2 bg-red-100 rounded-lg mr-3">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              Missing Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {result.missingSkills?.length > 0 ? (
                result.missingSkills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center px-3.5 py-1.5 rounded-xl text-sm font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm transition-transform hover:scale-105">
                    {skill}
                  </span>
                ))
              ) : (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 w-full text-center">
                  <span className="text-sm text-emerald-700 font-bold">🎉 Outstanding! You have all the core required skills!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap & Projects */}
        <div className="lg:col-span-8 space-y-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="glass-card p-8 border-t-4 border-t-brand-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2.5 bg-brand-100 rounded-xl mr-4">
                <BookOpen className="w-6 h-6 text-brand-600" />
              </div>
              Learning Roadmap
            </h2>
            {result.roadmap?.length > 0 ? (
              <div className="space-y-0 relative">
                {/* Vertical Timeline Line */}
                <div className="absolute top-4 bottom-4 left-[21px] w-0.5 bg-brand-100"></div>
                
                {result.roadmap.map((step, idx) => {
                  // Extract week/step prefix if exists to bold it
                  const match = step.match(/^([^:]+:)(.*)$/);
                  const prefix = match ? match[1] : '';
                  const content = match ? match[2] : step;

                  return (
                    <div key={idx} className="relative pl-14 py-4 group">
                      <div className="absolute top-1/2 -translate-y-1/2 left-[13px] w-4 h-4 rounded-full bg-white border-4 border-brand-500 group-hover:scale-125 transition-transform z-10 shadow-sm"></div>
                      <div className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-2xl p-5 shadow-sm group-hover:shadow-md transition-shadow">
                        <p className="text-gray-800 leading-relaxed text-base">
                          {prefix && <span className="font-bold text-brand-700 mr-2">{prefix}</span>}
                          {content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 italic p-4 text-center">No roadmap generated.</p>
            )}
          </div>

          <div className="glass-card p-8 border-t-4 border-t-accent">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="p-2.5 bg-accent-light rounded-xl mr-4">
                <Briefcase className="w-6 h-6 text-accent-dark" />
              </div>
              Suggested Projects
            </h2>
            {result.projects?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {result.projects.map((project, idx) => (
                  <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-accent-light transition-all duration-300">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-light text-accent-dark flex items-center justify-center font-bold mr-4">
                        {idx + 1}
                      </div>
                      <p className="text-gray-800 font-medium leading-relaxed pt-1">{project}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic p-4 text-center">No projects suggested.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
