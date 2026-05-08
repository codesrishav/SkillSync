import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { UploadCloud, FileText, Sparkles } from 'lucide-react';

const ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Analyst',
  'DevOps Engineer'
];

const Dashboard = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [manualSkills, setManualSkills] = useState('');
  const [jobRole, setJobRole] = useState(ROLES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setManualSkills(''); // clear text if file is uploaded
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');

    if (!file && !manualSkills) {
      setError('Please upload a resume (PDF) or paste your skills.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('resume', file);
      } else {
        formData.append('manualSkills', manualSkills);
      }
      formData.append('jobRole', jobRole);

      const res = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/result', { state: { result: res.data } });

    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing resume. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Hello, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Upload your resume or paste your skills below to get a personalized, AI-driven skill gap analysis.</p>
      </div>

      <div className="glass-panel p-8 sm:p-12 relative overflow-hidden animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        {/* Decorative accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-400 via-accent to-brand-400"></div>
        
        {error && (
          <div className="mb-8 bg-red-50/80 backdrop-blur-md text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center shadow-sm">
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleAnalyze} className="space-y-10">
          {/* Role Selection */}
          <div className="max-w-md mx-auto text-center">
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Select Target Role</label>
            <div className="relative">
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="block w-full pl-4 pr-10 py-4 text-base font-medium text-gray-900 bg-white/50 backdrop-blur-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-lg rounded-2xl shadow-sm appearance-none transition-all cursor-pointer hover:bg-white"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* File Upload */}
            <div 
              className={`relative overflow-hidden border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[280px] group ${
                file ? 'border-brand-500 bg-brand-50/50 shadow-inner' : 'border-gray-300 bg-white/30 hover:border-brand-400 hover:bg-white/60'
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setFile(e.dataTransfer.files[0]);
                  setManualSkills('');
                }
              }}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${file ? 'bg-brand-100 text-brand-600' : 'bg-gray-100 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-500'}`}>
                <UploadCloud className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {file ? <span className="text-brand-600">{file.name}</span> : 'Drag & Drop Resume'}
              </h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">
                PDF format only, up to 5MB
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary rounded-full"
              >
                Browse Files
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>

            {/* Manual Input */}
            <div className="flex flex-col min-h-[280px]">
              <label className="flex items-center text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                <FileText className="w-4 h-4 mr-2 text-brand-500" /> Or Paste Skills
              </label>
              <textarea
                className="flex-grow block w-full border border-gray-200 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm py-4 px-6 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-base resize-none transition-all hover:bg-white/80"
                placeholder="e.g. 3 years experience in React, Node.js. Familiar with Docker and AWS... I've built multiple REST APIs..."
                value={manualSkills}
                onChange={(e) => {
                  setManualSkills(e.target.value);
                  if (e.target.value) setFile(null); // clear file if text is entered
                }}
              />
            </div>
          </div>

          <div className="pt-8 flex justify-center border-t border-gray-100/50">
            <button
              type="submit"
              disabled={loading}
              className={`w-full max-w-md btn-primary text-lg py-4 rounded-2xl shadow-xl shadow-brand-500/20 ${
                loading ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Profile...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Skill Report
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
