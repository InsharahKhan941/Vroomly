
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';

const NavItem: React.FC<{
  icon: React.ReactNode;
  screen: Screen;
  currentScreen: Screen;
}> = ({ icon, screen, currentScreen }) => {
  const { setScreen } = useAppContext();
  const isActive = screen === currentScreen;

  return (
    <button
      onClick={() => setScreen(screen)}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
        isActive ? 'text-pink-300' : 'text-white/70 hover:text-white'
      }`}
    >
      {icon}
    </button>
  );
};

const BottomNav: React.FC = () => {
  const { screen } = useAppContext();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm">
      <div className="flex justify-around items-center h-20 px-4">
        <NavItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
          screen={Screen.PROFILE}
          currentScreen={screen}
        />
        <NavItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>}
          screen={Screen.DASHBOARD}
          currentScreen={screen}
        />
        <NavItem
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.82l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2.82l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>}
          screen={Screen.SETTINGS}
          currentScreen={screen}
        />
      </div>
    </div>
  );
};

export default BottomNav;