import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen, Role } from '../types';
import { VanIcon, StudentIcon, DriverIcon } from '../constants';

const RoleButton: React.FC<{
  icon: React.ReactNode;
  label: Role;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center w-full p-4 bg-[#2E2E55] rounded-xl text-white hover:bg-pink-400/20 border-2 border-transparent hover:border-pink-400 transition-all duration-300"
  >
    <div className="bg-[#FFA8A8] p-3 rounded-lg mr-4">
      {icon}
    </div>
    <span className="text-lg font-semibold">{label}</span>
  </button>
);

const LaunchScreen: React.FC = () => {
  const { setScreen, setRole } = useAppContext();

  const handleRoleSelect = (role: Role) => {
    setRole(role);
    setScreen(Screen.AUTH);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center p-8 text-white">
      <div className="w-full flex flex-col items-center pt-20">
        <VanIcon />
        <h1 className="text-5xl font-bold tracking-widest text-white mt-4">VROOMLY</h1>
        <p className="text-white/80 mt-2">Smart rides, Simple lives</p>
      </div>
      
      <div className="w-full flex flex-col items-center space-y-6">
        <h2 className="text-lg font-semibold">Login as</h2>
        <div className="w-full space-y-4">
          <RoleButton 
            icon={<StudentIcon />}
            label="Student"
            onClick={() => handleRoleSelect('Student')}
          />
          <RoleButton 
            icon={<DriverIcon />}
            label="Driver"
            onClick={() => handleRoleSelect('Driver')}
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;