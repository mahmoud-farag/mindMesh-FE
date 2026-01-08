import React from 'react';
import { X } from 'lucide-react';
import { useModalAnimation } from '../../context/customHooks';

/**
 * BaseModal - A highly customizable and reusable modal component
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal should close
 * @param {React.ReactNode} children - Modal body content
 * @param {string} title - Modal header title (optional)
 * @param {string} subtitle - Modal header subtitle (optional)
 * @param {React.ReactNode} icon - Custom icon for header (optional)
 * @param {React.ReactNode} footer - Custom footer content (replaces default buttons)
 * @param {string} confirmText - Primary action button text
 * @param {string} cancelText - Cancel button text
 * @param {function} onConfirm - Primary action callback
 * @param {boolean} isLoading - Disables buttons when true
 * @param {boolean} showCloseButton - Show/hide close X button
 * @param {boolean} showFooter - Show/hide footer buttons
 * @param {boolean} closeOnBackdropClick - Close modal when clicking backdrop
 * @param {string} size - Modal size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {string} className - Additional classes for modal container
 * @param {string} confirmButtonClassName - Classes for confirm button
 * @param {string} cancelButtonClassName - Classes for cancel button
 */
export default function BaseModal({
  isOpen,
  onClose,
  children,
  // Header props
  title,
  subtitle,
  icon,
  // Footer props
  footer,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  // Behavior props
  isLoading = false,
  showCloseButton = true,
  showFooter = true,
  closeOnBackdropClick = true,
  // Styling props
  size = 'md',
  className = '',
  confirmButtonClassName = '',
  cancelButtonClassName = '',
  isProgress,
  progress
}) {
  //* States

  //* Custom hooks
  const { isVisible, handleCloseModal, shouldRender } = useModalAnimation({
    isOpen,
    onClose,
  });

  //* Refs

  //* Helper functions

  //* Life cycle hooks

  //* Handlers
  function handleBackdropClick(e) {
    if (closeOnBackdropClick && !isLoading) {
      handleCloseModal();
    }
  }

  function handleCloseClick() {
    if (!isLoading) {
      handleCloseModal();
    }
  }

  //* JSX

  // Size variants
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-4xl',
  };

  // Default button styles
  const defaultCancelClasses =
    'bg-slate-100 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const defaultConfirmClasses =
    'bg-violet-500 hover:bg-violet-600 text-white px-5 py-2 rounded-lg font-medium cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center transition-all duration-300 ${
        isVisible ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-full bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-900/20 p-6 transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        } ${sizeClasses[size] || sizeClasses.md} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={handleCloseClick}
            disabled={isLoading}
            className="absolute top-5 right-5 w-8 h-8 inline-flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        )}

        {/* Header */}
        {(title || icon) && (
          <div className="mb-6 pr-8">
            {icon && (
              <div className="mb-3 inline-flex items-center justify-center">
                {icon}
              </div>
            )}
            {title && (
              <h2 className="text-xl font-semibold text-slate-900 tracking-tight text-center">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 mt-1 text-center">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {showFooter && (
          <div className="mt-6 flex gap-3 justify-end">
            {footer ? (
              footer
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCloseClick}
                  disabled={isLoading}
                  className={cancelButtonClassName || defaultCancelClasses}
                >
                  {cancelText}
                </button>
                {onConfirm && (
                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={confirmButtonClassName || defaultConfirmClasses}
                  >
                    {isLoading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Loading...
                      </span>
                    ) : isProgress ? (
                      <>
                        {confirmText} {progress}%
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
