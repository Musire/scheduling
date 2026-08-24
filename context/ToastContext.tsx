"use client";

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  createSuccess: (message: string) => void;
  createError: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const createSuccess = useCallback((msg: string) => addToast(msg, 'success'), [addToast]);
  const createError = useCallback((msg: string) => addToast(msg, 'error'), [addToast]);

  return (
    <ToastContext.Provider value={{ createSuccess, createError }}>
      {children}
      
      {/* 
        Container positioning:
        - Default (Mobile): bottom-6, horizontally centered
        - sm & up (Desktop): bottom-6, right-6 
      */}
      <div className="fixed z-50 pointer-events-none flex flex-col gap-3 
        bottom-6 left-1/2 -translate-x-1/2 w-[90vw] max-w-87.5
        sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:w-auto"
      >
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`
              relative overflow-hidden pointer-events-auto shadow-lg 
              min-w-60 px-5 py-3.5 rounded-lg  font-sans text-sm font-medium  
              animate-fade-in-out border
              ${toast.type === 'success' ? 'bg-success/20 border-success text-success' : 'bg-error/20 border-error text-error'}
            `}
          >
            {/* The Toast Message */}
            <p className="mb-1">{toast.message}</p>

            {/* The Shrinking Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/40 animate-progress-shrink" />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};