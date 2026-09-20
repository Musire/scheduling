'use client';

import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const container = document.getElementById("portal-root");
      if (container) {
        setPortalContainer(container);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!portalContainer) return null;

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className={`fixed flex items-center justify-center will-change-transform inset-0 w-screen z-50 bg-black/60 ${
        isOpen ? 'visible' : 'hidden'
      }`}
      style={{
        WebkitBackdropFilter: 'none',
        backdropFilter: 'none',
        transform: 'translateZ(0)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-darkest p-6 relative w-[93dvw] max-w-sm md:max-w-md duration-300 ease-out animate-ghostIn flex-col flex rounded-xl"
      >
        {/* Render header & close button ONLY if title is passed */}
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-white/87 font-bold capitalize">
              {title}
            </h2>
            <button
              className="text-white/87 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        )}

        {children}
      </div>
    </div>,
    portalContainer
  );
}