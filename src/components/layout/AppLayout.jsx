import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children }) => {
  //* States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //* Custom hooks

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers
  const onToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //* JSX

  return (
    <div className="flex bg-neutral-50 min-h-screen md:h-screen text-neutral-900  ">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={onToggleSidebar} />
        <main className="py-3  px-5 scroll-smooth bg-neutral-100 flex-1 overflow-x-hidden overflow-y-auto ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

