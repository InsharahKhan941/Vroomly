import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import { VanIcon } from '../constants';

const SplashScreen: React.FC = () => {
  const { setScreen } = useAppContext();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setStep(1), 500), // bg color
      setTimeout(() => setStep(2), 1000), // VROOMLY appears
      setTimeout(() => setStep(3), 1500), // Van slides in
      setTimeout(() => setStep(4), 2500), // Van centers
      setTimeout(() => setStep(5), 3000), // Tagline appears
      setTimeout(() => setScreen(Screen.LAUNCH), 4000),
    ];

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVanPosition = () => {
    if (step < 3) return '-translate-x-full opacity-0';
    if (step === 3) return 'translate-x-0 opacity-100';
    if (step > 3) return 'translate-x-0 opacity-100 -translate-y-8';
    return '';
  };
  
  const getVroomlyPosition = () => {
    if (step < 2) return 'opacity-0 scale-90';
    if (step >= 2) return 'opacity-100 scale-100';
    return '';
  };

  return (
    <div className={`w-full h-full flex flex-col justify-center items-center transition-colors duration-500 ${step > 0 ? 'bg-[#3A3A69]' : 'bg-white'}`}>
      <div className="relative flex flex-col items-center">
        <div className={`transition-all duration-1000 ease-out ${getVanPosition()}`}>
          <VanIcon />
        </div>
        <h1 className={`text-5xl font-bold tracking-widest text-white transition-all duration-700 ${getVroomlyPosition()}`}>
          VROOMLY
        </h1>
        <p className={`text-white/80 mt-2 transition-opacity duration-700 ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          Smart rides, Simple lives
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;