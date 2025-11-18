
import React from 'react';
import { GoogleIcon } from '../components/icons';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen font-sans bg-slate-900 text-gray-200 flex flex-col justify-center items-center p-4">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.014 5.683a.75.75 0 011.972 0l3.334 2.035a.75.75 0 010 1.282l-3.334 2.035a.75.75 0 01-1.972 0L5.68 9.001a.75.75 0 010-1.282l3.334-2.035z" clipRule="evenodd" />
                </svg>
                <h1 className="text-3xl font-bold">VolleyApp</h1>
            </div>
          <h2 className="mt-2 text-2xl font-bold text-white">Selamat Datang Kembali</h2>
          <p className="mt-2 text-sm text-gray-400">Login untuk mengelola tim Anda</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLoginClick}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Alamat Email</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 bg-slate-800 placeholder-gray-500 text-gray-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Alamat Email" 
                defaultValue="coach@volleyapp.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-slate-700 bg-slate-800 placeholder-gray-500 text-gray-200 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
                defaultValue="password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 bg-slate-700 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-gray-400">
                Ingat saya
              </label>
            </div>
            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
              Lupa password?
            </a>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
              Login
            </button>
          </div>
        </form>
         <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-900 text-gray-500">
              ATAU
            </span>
          </div>
        </div>
        <div>
          <button type="button" onClick={onLogin} className="group relative w-full flex justify-center items-center py-3 px-4 border border-slate-600 text-sm font-medium rounded-md text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500">
            <GoogleIcon className="mr-3" />
            Masuk dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginView;