import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { LogoutIcon } from '../components/icons';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  showNotification: (message: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, showNotification }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('bg-slate-900'));

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('bg-slate-900', 'text-white');
      document.body.classList.remove('bg-gray-100', 'text-slate-900');
    } else {
      document.body.classList.remove('bg-slate-900', 'text-white');
      document.body.classList.add('bg-gray-100', 'text-slate-900');
    }
  }, [isDarkMode]);

  const handleToggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    showNotification(newState ? "Notifikasi diaktifkan" : "Notifikasi dinonaktifkan");
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const SettingRow: React.FC<{label: string, children: React.ReactNode, isAction?: boolean}> = ({ label, children, isAction }) => (
    <div className="flex justify-between items-center p-4">
      <span className="font-semibold">{label}</span>
      {children}
    </div>
  );

  const ToggleSwitch: React.FC<{enabled: boolean}> = ({enabled}) => (
    <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${enabled ? 'bg-indigo-600' : 'bg-slate-600'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${enabled ? 'translate-x-5' : ''}`}></div>
    </div>
  );

  const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profil</h2>
        <p className="text-gray-400">Kelola akun dan pengaturan Anda</p>
      </div>

      <div className="flex flex-col items-center space-y-3 bg-slate-800 p-6 rounded-lg">
        <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-slate-700 shadow-lg" />
        <div className="text-center">
            <h3 className="text-xl font-bold">{user.name}</h3>
            <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      
      <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
        <div onClick={handleToggleNotifications} className="cursor-pointer">
          <SettingRow label="Notifikasi">
            <ToggleSwitch enabled={notificationsEnabled} />
          </SettingRow>
        </div>
        <div onClick={handleToggleDarkMode} className="cursor-pointer">
          <SettingRow label="Mode Gelap">
            <ToggleSwitch enabled={isDarkMode} />
          </SettingRow>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
        <button className="w-full text-left">
            <SettingRow label="Riwayat Pesanan">
                <ChevronRightIcon />
            </SettingRow>
        </button>
        <button className="w-full text-left">
            <SettingRow label="Bantuan & Dukungan">
                <ChevronRightIcon />
            </SettingRow>
        </button>
        <button className="w-full text-left">
            <SettingRow label="Tentang Aplikasi">
                <ChevronRightIcon />
            </SettingRow>
        </button>
      </div>

      <div>
        <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 font-bold py-3 px-4 rounded-lg transition-colors">
          <LogoutIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;