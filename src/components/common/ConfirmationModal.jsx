import React, { useState, useEffect, useRef } from 'react';
import { X, TriangleAlert, AlertCircle, Info } from 'lucide-react';
import { useModalAnimation } from '../../context/customHooks';

//* Constants

const VARIANTS = {
  danger: {
    iconBg: 'bg-gradient-to-r from-red-200 to-red-300',
    iconColor: 'text-red-700/70',
    confirmBtn: 'bg-red-500 hover:bg-red-400',
    Icon: TriangleAlert,
  },
  warning: {
    iconBg: 'bg-gradient-to-r from-amber-200 to-amber-300',
    iconColor: 'text-amber-700/70',
    confirmBtn: 'bg-amber-500 hover:bg-amber-400',
    Icon: AlertCircle,
  },
  info: {
    iconBg: 'bg-gradient-to-r from-blue-200 to-blue-300',
    iconColor: 'text-blue-700/70',
    confirmBtn: 'bg-blue-500 hover:bg-blue-400',
    Icon: Info,
  },
};

export default function ConfirmationModal({
  children,
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  //* States

  //* Custom hooks
  const { isVisible, handleCloseModal, shouldRender } = useModalAnimation({ isOpen, onClose }, {});

  //* Refs

  //* Helper functions


  //* Life cycle hooks

  //* Handlers

  //* JSX

  if (!shouldRender) return null;
  const { iconBg, iconColor, confirmBtn, Icon } =
    VARIANTS[variant] || VARIANTS.danger;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ${isVisible ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-transparent'
        }`}
      onClick={handleCloseModal}
    >
      <div
        className={`space-y-7 relative max-w-md w-full bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-xl shadow-slate-900/30 p-8 transition-all duration-300 ease-out ${isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-20 opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleCloseModal}
          disabled={isLoading}
          className="absolute top-8 right-6 hover:bg-slate-300 text-slate-500 size-6 inline-flex justify-center items-center rounded-md font-semibold disabled:opacity-50"
        >
          <X className="size-8" strokeWidth={2} />
        </button>

        {/* Modal Header */}
        <div className="border-b-2 pb-2 space-y-3 flex flex-col justify-center items-center">
          <div className={`size-19 ${iconBg} rounded-2xl inline-flex justify-center items-center`}>
            <Icon className={`size-12 ${iconColor}`} strokeWidth={2} />
          </div>
          <h2 className="text-xl font-medium text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Content */}
        {children}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleCloseModal}
            disabled={isLoading}
            className="bg-slate-100 hover:bg-slate-400 hover:text-white/90 px-4 py-1 rounded-md text-xl cursor-pointer transition-all duration-300 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 ${confirmBtn} text-white/90 px-4 py-1 rounded-md text-xl cursor-pointer transition-all duration-300 disabled:opacity-50`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
