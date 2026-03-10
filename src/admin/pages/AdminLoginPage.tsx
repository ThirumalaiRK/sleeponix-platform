import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import logo from '/images/og logo.png';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Logged in successfully!');
      navigate('/admin/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f6efe6] font-sans">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#fffaf1] border border-[#eadfcc] rounded-[20px] shadow-premium">
        <div className="text-center mt-2">
          <img src={logo} alt="Sleeponix Logo" className="h-14 mx-auto mb-6" />
          <h1 className="text-3xl font-serif font-bold text-[#143d29]">Admin Login</h1>
          <p className="text-[#5f4b3b] mt-2">Welcome back, please secure your session.</p>
        </div>
        <form className="space-y-6 pb-2" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-bold text-[#143d29] tracking-wide uppercase">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 font-medium bg-white border border-[#eadfcc] rounded-xl shadow-sm focus:ring-2 focus:ring-[#143d29] focus:border-[#143d29] outline-none transition-all placeholder-gray-400"
              placeholder="admin@sleeponix.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-bold text-[#143d29] tracking-wide uppercase">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 font-medium bg-white border border-[#eadfcc] rounded-xl shadow-sm focus:ring-2 focus:ring-[#143d29] focus:border-[#143d29] outline-none transition-all placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3.5 mt-4 text-base font-bold text-white bg-[#143d29] rounded-xl shadow-premium hover:bg-[#0f2e1f] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#143d29] focus:ring-offset-[#f6efe6] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;