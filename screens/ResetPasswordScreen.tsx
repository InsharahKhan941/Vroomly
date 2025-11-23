import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import { VanIcon } from '../constants';
import { supabase } from '../backend/supabaseClient';

const ResetPasswordScreen: React.FC = () => {
  const { setScreen, addNotification } = useAppContext();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  // Check if user has a valid session (token from email link)
  useEffect(() => {
    const checkSession = async () => {
      // First, ask supabase for current session
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsValidToken(true);
        return;
      }

      // If no session, we try to parse tokens from the URL (fallback)
      const search = window.location.search;
      const params = new URLSearchParams(search);
      let accessToken = params.get('access_token') || params.get('accessToken');
      let refreshToken = params.get('refresh_token') || params.get('refreshToken');

      // Some setups put tokens in the URL hash
      if (!accessToken && window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        if (!accessToken) accessToken = hashParams.get('access_token') || hashParams.get('accessToken');
        if (!refreshToken) refreshToken = hashParams.get('refresh_token') || hashParams.get('refreshToken');
      }

      if (accessToken) {
        try {
          // Set session directly from tokens (supabase-js v2)
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          const { data: newData } = await supabase.auth.getSession();
          if (newData.session) {
            setIsValidToken(true);
            return;
          }
        } catch (err: any) {
          console.error('setSession failed', err);
        }
      }

      addNotification({
        title: 'Error',
        message: 'Invalid or expired reset link. Please request a new one.',
      });
      setTimeout(() => setScreen(Screen.FORGOT_PASSWORD), 2000);
    };

    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      addNotification({
        title: 'Error',
        message: 'Passwords do not match.',
      });
      return;
    }

    if (newPassword.length < 6) {
      addNotification({
        title: 'Error',
        message: 'Password must be at least 6 characters.',
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      addNotification({
        title: 'Error',
        message: error.message,
      });
      return;
    }

    addNotification({
      title: 'Success',
      message: 'Your password has been reset successfully!',
    });

    // Redirect to login after success
    setTimeout(() => setScreen(Screen.AUTH), 2000);
  };

  if (!isValidToken) {
    return (
      <div className="w-full h-full flex flex-col p-8 text-white bg-[#3A3A69] justify-center items-center">
        <p className="text-white/80">Validating your reset link...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-8 text-white bg-[#3A3A69]">
      <button onClick={() => setScreen(Screen.AUTH)} className="self-start text-pink-300 mb-8 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Login
      </button>

      <div className="flex flex-col items-center">
        <VanIcon />
        <h1 className="text-3xl font-bold mt-4">Reset Password</h1>
        <p className="text-white/80 mt-2 text-center">Enter your new password below.</p>
      </div>

      <form className="space-y-6 mt-12" onSubmit={handleResetPassword}>
        <Input
          label="New Password"
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;
