import React, { useEffect } from 'react';
import { Notification as NotificationType } from '../types';
import { useAppContext } from '../context/AppContext';

interface NotificationProps {
  notification: NotificationType;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const { removeNotification } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  return (
    <div className="bg-[#2E2E55] text-white p-3 rounded-lg shadow-lg animate-fade-in-down mb-3 border border-pink-400/50">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-pink-300 text-sm">{notification.title}</h4>
          <p className="text-xs text-white/90">{notification.message}</p>
        </div>
        <button onClick={() => removeNotification(notification.id)} className="text-white/70 hover:text-white ml-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
