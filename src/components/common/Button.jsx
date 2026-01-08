import React from 'react'

export default function Button({ children, onClick, type = 'button', disabled = false, className = '', size = 'md', variant = 'primary' }) {


  const baseStyles = 'cursor-pointer inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap';
  const variantStyles = {
    primary: 'bg-linear-to-r from-violet-500 to-purple-500 text-white  shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-purple-600 hover:shadow-xl hover:shadow-violet-500/35',
    secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-200',
    outline: 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
  };

  const sizeStyles = {
    sm: 'h-9 px-4 text-xs',
    md: 'h-11 px-5 text-sm'
  }
  const styles = [sizeStyles[size], variantStyles[variant], baseStyles, className].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  )
}
