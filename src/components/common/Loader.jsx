import { Loader2 } from 'lucide-react';

function Loader({ size = 60, className = '', fullScreen = false }) {
  //* States

  //* Custom hooks

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers

  //* JSX

  const wrapperClass = fullScreen
    ? 'flex items-center justify-center min-h-screen bg-black/30 backdrop-blur-sm fixed inset-0 z-50'
    : 'flex items-center justify-center py-20';

  return (
    <div className={wrapperClass}>
      <Loader2
        className={`animate-spin text-violet-500 ${className}`}
        size={size}
      />
    </div>
  );
}

export default Loader;