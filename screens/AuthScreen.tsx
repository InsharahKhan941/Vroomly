import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen, User } from '../types';
import { VanIcon } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';

const AuthScreen: React.FC = () => {
  const { role, login, setScreen } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock user login
    const mockUser: User = {
      id: '123',
      fullName: 'Hamza Khan',
      email: `student@example.com`,
      role: role!,
      studentId: role === 'Student' ? '01-00000-000' : undefined,
      cnic: role === 'Driver' ? '00000-0000000-0' : undefined,
      department: 'Computer Science Department',
    };
    login(mockUser);
  };

  const commonFields = (
    <>
      <Input label="Email" id="email" type="email" placeholder={role === 'Student' ? "Student@example.com" : "Driver@example.com"} required />
      <Input label="Password" id="password" type="password" placeholder="********" required />
    </>
  );

  return (
    <div className="w-full h-full flex flex-col p-8 text-white overflow-y-auto">
      <button onClick={() => setScreen(Screen.LAUNCH)} className="self-start text-pink-300 mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
      </button>
      <div className="w-full flex flex-col items-center">
        <VanIcon />
        <h1 className="text-4xl font-bold tracking-widest text-white mt-4">VROOMLY</h1>
        <p className="text-white/80 mt-2">Smart rides, Simple lives</p>
      </div>

      <div className="flex bg-[#2E2E55] rounded-lg p-1 my-8">
        <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${isLogin ? 'bg-[#FFA8A8] text-[#3A3A69]' : 'text-white'}`}>Login</button>
        <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2 rounded-md font-semibold transition-colors ${!isLogin ? 'bg-[#FFA8A8] text-[#3A3A69]' : 'text-white'}`}>Sign Up</button>
      </div>

      <div className="flex-grow">
        <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
              <>
                <Input label="Full Name" id="fullName" type="text" placeholder="Hamza Khan" required />
                <Input label={role === 'Student' ? "Student ID" : "CNIC Number"} id="roleId" type="text" placeholder={role === 'Student' ? "00000" : "0000-0000000-0"} required />
              </>
          )}
          {commonFields}
          
          <div className="pt-4">
            <Button type="submit">{isLogin ? 'LOGIN' : 'SIGN UP'}</Button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          {isLogin ? (
            <>
              <button onClick={() => setScreen(Screen.FORGOT_PASSWORD)} className="text-sm text-pink-300 hover:underline">Forgot password?</button>
              <p className="text-sm text-white/70 mt-2">
                Don't have an account? <button onClick={() => setIsLogin(false)} className="font-semibold text-pink-300 hover:underline">Sign Up</button>
              </p>
            </>
          ) : (
            <p className="text-sm text-white/70">
              Already have an account? <button onClick={() => setIsLogin(true)} className="font-semibold text-pink-300 hover:underline">Login</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;