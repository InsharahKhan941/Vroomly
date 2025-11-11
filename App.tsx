import React from 'react';
import { useAppContext } from './context/AppContext';
import { Screen } from './types';
import SplashScreen from './screens/SplashScreen';
import LaunchScreen from './screens/LaunchScreen';
import AuthScreen from './screens/AuthScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import StudentDashboard from './screens/StudentDashboard';
import DriverDashboard from './screens/DriverDashboard';
import ComplaintScreen from './screens/ComplaintScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import MessagesScreen from './screens/MessagesScreen';
import Notification from './components/Notification';
import ChangePasswordScreen from './screens/ChangePasswordScreen';

const App: React.FC = () => {
  const { screen, role, notifications } = useAppContext();

  const renderScreen = () => {
    switch (screen) {
      case Screen.SPLASH:
        return <SplashScreen />;
      case Screen.LAUNCH:
        return <LaunchScreen />;
      case Screen.AUTH:
        return <AuthScreen />;
      case Screen.FORGOT_PASSWORD:
        return <ForgotPasswordScreen />;
      case Screen.DASHBOARD:
        return role === 'Student' ? <StudentDashboard /> : <DriverDashboard />;
      case Screen.COMPLAINT:
        return <ComplaintScreen />;
      case Screen.ATTENDANCE:
        return <AttendanceScreen />;
      case Screen.PROFILE:
        return <ProfileScreen />;
      case Screen.SETTINGS:
          return <SettingsScreen />;
      case Screen.MESSAGES:
          return <MessagesScreen />;
      case Screen.CHANGE_PASSWORD:
          return <ChangePasswordScreen />;
      default:
        return <LaunchScreen />;
    }
  };

  const visibleNotifications = notifications.filter(note => !note.targetRole || note.targetRole === role);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 p-4">
      <div className="w-full max-w-md h-full max-h-[926px] bg-[#3A3A69] shadow-2xl rounded-3xl overflow-hidden relative">
        {renderScreen()}
        <div className="absolute top-5 right-5 w-4/5 z-50">
          {visibleNotifications.map(note => (
            <Notification key={note.id} notification={note} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;