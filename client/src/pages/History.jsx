import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Clock, Briefcase, ChevronRight, Activity } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 animate-fade-in-up">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin"></div>
          <div className="w-8 h-8 border-4 border-accent-light border-b-accent rounded-full animate-spin absolute top-4 left-4 animation-delay-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center shadow-sm">
        <span className="font-bold">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-12 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center">
          <Activity className="w-8 h-8 mr-3 text-brand-500" />
          Analysis History
        </h1>
        <p className="mt-3 text-lg text-gray-600">Review your past skill gap reports and track your progress over time.</p>
      </div>

      {history.length === 0 ? (
        <div className="glass-card text-center py-20 px-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="inline-flex justify-center items-center w-20 h-20 bg-gray-50 rounded-full mb-6">
            <Clock className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No history yet</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">You haven't analyzed any resumes yet. Head over to the dashboard to get started!</p>
          <Link to="/dashboard" className="btn-primary">
            Analyze Resume Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          {history.map((item, idx) => {
            const date = new Date(item.createdAt).toLocaleDateString(undefined, { 
              year: 'numeric', month: 'short', day: 'numeric' 
            });
            
            // Color based on gap
            const gapColor = item.gapPercentage <= 20 ? 'text-emerald-500' : 
                             item.gapPercentage <= 50 ? 'text-amber-500' : 'text-red-500';

            return (
              <div key={item._id} className="glass-card p-6 flex flex-col group hover:-translate-y-1 hover:shadow-xl hover:border-brand-200 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 border border-brand-100 group-hover:bg-brand-100 transition-colors">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5 text-brand-600" />
                    <span className="text-xs font-bold text-brand-800">{item.jobRole}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-400 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> {date}
                  </span>
                </div>
                
                <div className="flex-grow mb-6">
                  <div className="flex items-end mb-4">
                    <span className={`text-4xl font-black ${gapColor}`}>{item.gapPercentage}%</span>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-2 mb-1.5">Gap</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Extracted Skills</span>
                      <span className="font-bold text-gray-900">{item.extractedSkills.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Missing Skills</span>
                      <span className="font-bold text-gray-900">{item.missingSkills.length}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/result" 
                  state={{ result: item }}
                  className="w-full btn-secondary group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all duration-300 mt-auto"
                >
                  View Full Report <ChevronRight className="w-4 h-4 ml-1.5 opacity-70 group-hover:opacity-100" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
