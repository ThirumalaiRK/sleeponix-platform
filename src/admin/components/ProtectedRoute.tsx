import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  // Primary Authentication (Preferred Source)
  const { user: authUser, loading: authLoading } = useAuth();

  // Fallback: Direct Supabase Session Check
  const [fallbackSession, setFallbackSession] = useState<any>(null);
  const [fallbackLoading, setFallbackLoading] = useState(true);

  useEffect(() => {
    // Load initial Supabase session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setFallbackSession(session);
      setFallbackLoading(false);
    };

    checkSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setFallbackSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // If either system is still loading, show loader
  if (authLoading || fallbackLoading) {
    return <div>Loading...</div>;
  }

  // Auth is valid if either useAuth OR Supabase session has user
  const isAuthenticated = authUser || fallbackSession;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
