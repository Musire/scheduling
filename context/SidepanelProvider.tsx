'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type SidePanelContextType = {
  isOpen: boolean;
  currentModal: string | null;
  loadModal: (id: string) => void;
  clearModal: () => void;
  openSidePanel: () => void;
  closeSidePanel: () => void;
};

const SidePanelContext = createContext<SidePanelContextType | undefined>(undefined);

type SidePanelProviderProps = {
  children: ReactNode;
};

export function SidePanelProvider({ children }: SidePanelProviderProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openSidePanel = () => {
    setOpen(true)
  }

  const closeSidePanel = () => {
    setOpen(false)
  }

  const loadModal = (id: string) => {
    setCurrentModal(id)
    openSidePanel()
  }

  const clearModal = () => {
    setCurrentModal(null)
    closeSidePanel()
  };


  return (
    <SidePanelContext.Provider 
      value={{ 
        isOpen,
        currentModal,
        loadModal,
        clearModal, 
        openSidePanel, 
        closeSidePanel
      }}
    >
      {children}
    </SidePanelContext.Provider>
  );
}

export function useSidePanel() {
  const context = useContext(SidePanelContext);
  if (!context) {
    throw new Error("useSidePanel must be used within SiePanelProvider");
  }
  return context;
}