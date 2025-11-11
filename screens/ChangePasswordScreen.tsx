import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';

const ChangePasswordScreen: React.FC = () => {
  const { setScreen, addNotification } = useAppContext();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    // Mock API call
    addNotification({ title: 'Success!', message: 'Your password has been updated.' });
    setScreen(Screen.SETTINGS);
  };

  return (
    <div className="w-full h-full flex flex-col text-white">
      <Header title="Change Password" showBackButton onBack={() => setScreen(Screen.SETTINGS)} />
      <main className="flex-grow p-6 flex flex-col items-center justify-center">
        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <Input 
            label="Current Password" 
            id="currentPassword" 
            type="password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required 
          />
          <Input 
            label="New Password" 
            id="newPassword" 
            type="password" 
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required 
          />
          <Input 
            label="Confirm New Password" 
            id="confirmPassword" 
            type="password" 
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <div className="pt-8">
            <Button type="submit">Update Password</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChangePasswordScreen;