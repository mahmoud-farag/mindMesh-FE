import React from 'react';
import { useAuth } from '../../context/authContext';
import { User, Bell, Menu } from 'lucide-react';

export default function Header({ onToggleSidebar }) {
  //* States

  //* Custom hooks
  const { loggedUser } = useAuth();

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX

  return (
    <header className=' bg-white/80 sticky top-0 z-40 w-full h-16 backdrop-blur-sm border-b-2 border-slate-400'>
      <div className='flex justify-between px-4 h-full'>
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className='  my-2 p-2 cursor-pointer md:hidden inline-flex justify-center items-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200'
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>

        <div className='hidden md:block' />

        <div className='flex items-center gap-3'>
          <button className='relative inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 rounded-xl transition-all duration-200 group'>
            <Bell size={26} strokeWidth={2} className='group-hover:scale-110 transition-transform duration-200' />
            <span className='bg-violet-500 absolute top-1.5 right-1.5 w-3 h-3 rounded-full ring-2 ring-white ' />
          </button>

          {/* User Profile */}
          <div className='flex items-center gap-3 pl-3 border-l border-slate-200/60'>
            <div className='flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors duration-200 group cursor-pointer'>
              <div className='bg-linear-to-br from-violet-400 to-purple-500 rounded-xl w-9 h-9 inline-flex justify-center items-center text-white shadow-md shadow-violet-500/30 group-hover:shadow-lg group-hover:shadow-violet-500/40 transition-all duration-200'>
                <User size={26} strokeWidth={2} />
              </div>

              <div >
                <p className='text-md font-semibold text-slate-900 '>
                  {loggedUser?.username || 'User'}
                </p>
                <p className='text-sm text-slate-600'>
                  {loggedUser?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </header>
  );


}
