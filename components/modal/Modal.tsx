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

    // Sync portal container safely after mounting completes
    useEffect(() => {
        // requestAnimationFrame pushes the look-up and state change to the next visual paint loop
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

    // Return null during SSR and initial hydration until the container is resolved
    if (!portalContainer) return null;

    return createPortal(
        <div
            onClick={handleBackdropClick}
            className={`fixed flex items-center justify-center will-change-transform inset-0 w-screen z-50 bg-black/60 ${isOpen ? 'visible': 'hidden'}`}
            style={{
                WebkitBackdropFilter: 'none', 
                backdropFilter: 'none',
                transform: 'translateZ(0)'
            }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-darkest p-6 relative w-[93dvw] max-w-sm md:max-w-md duration-300 ease-out animate-ghostIn flex-col flex"
          >
            <button
              className="absolute text-white/87 top-3 w-7 h-7 right-3 centered rounded-full snappy"
              onClick={onClose}
            >
              ✕
            </button>
            <h2 className="text-lg text-white/87 font-bold mb-4 capitalize">
              {title ?? "modal title"}
            </h2>
            {children}
          </div>
        </div>,
        portalContainer 
    );
}
