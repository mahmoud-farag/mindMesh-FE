import React from 'react'
import { useAuth } from '../../context/authContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, FileText, LayoutDashboard, Link, User, BrainCircuit, X, LogOut } from 'lucide-react';

export default function Sidebar({ isSidebarOpen, onToggleSidebar }) {

  const { logoutHandler } = useAuth();
  const navigate = useNavigate();

  function logout() {
    logoutHandler();
    navigate('/login');

  }


  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/documents', icon: FileText, text: 'Documents' },
    { to: '/flashcards', icon: BookOpen, text: 'Flashcards' },
    { to: '/profile', icon: User, text: 'Profile' },

  ]

  return (
    <>
      <div className={`fixed inset-0 bg-black/70 z-40 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onToggleSidebar}
        aria-hidden='true'
      >
      </div>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 flex flex-col md:relative md:w-64 md:shrink-0 md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo and Close button for mobile */}
        <div className=' flex items-center justify-between h-16 px-4 border-b border-slate-200/60'>
          <div className='flex items-center gap-3'>
            <div className='inline-flex justify-center items-center w-9 h-9  rounded-xl bg-linear-to-br from-violet-500 to-slate-500 shadow-md shadow-violet-200/20'>
              <BrainCircuit className='text-white' size={24} strokeWidth={2.5} />
            </div>
            <h1 className='text-sm md:text-base font-bold text-slate-900 tracking-tight'>AI Learning Assistant</h1>
          </div>

          <button onClick={onToggleSidebar} className='cursor-pointer md:hidden text-slate-500 hover:text-slate-700'>
            <X size={24} />
          </button>
        </div>


        <nav className='flex-1 px-2 py-4 space-y-1.5'>
          {navLinks.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onToggleSidebar}
              className={({ isActive }) => `group flex items-center gap-3 px-3 py-2.5  text-sm font-semibold rounded-xl transition-all duration-200 ${isActive ? 'bg-linear-to-r from-violet-500 to-purple-500 text-white shadow-lg  shadow-violet-500/25'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    strokeWidth={2.5}
                    className={` transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'
                      }`}
                  />

                  {item.text}
                </>
              )}
            </NavLink>
          ))
          }
        </nav>


        <div className='px-6 py-4 border-t border-slate-400/70 hover:bg-slate-100'>
          <button
            onClick={logout}
            className='group cursor-pointer inline-flex items-center gap-3 font-semibold text-slate-700'
          >
            <LogOut
              size={24}
              strokeWidth={2.5}
              className='transition-transform duration-200 group-hover:scale-110'
            />
            Logout
          </button>

        </div>
      </aside>



    </>
  )
}
