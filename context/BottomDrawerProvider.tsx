'use client';

import { useDrawerState } from "@/hooks/useDrawerState";
import { LoadModalOptions } from "@/hooks/useFetchState";
import { createContext, ReactNode, useContext, useMemo } from "react";

type BottomDrawerContextType = {
  isOpen: boolean;
  isLoading: boolean;
  currentModal: string | null;
  modalData: unknown;
  loadModal: (id: string, options?: LoadModalOptions) => void;
  clearModal: () => void;
  openSidePanel: () => void;
  closeSidePanel: () => void;
};

const BottomDrawerContext = createContext<BottomDrawerContextType | undefined>(undefined);

type BottomDrawerProviderProps = {
  children: ReactNode;
};

export function BottomDrawerProvider({ children }: BottomDrawerProviderProps) {
  const {
    isOpen,
    isLoading,
    currentModal,
    modalData,
    loadModal,
    clearModal,
    openSidePanel,
    closeSidePanel,
  } = useDrawerState();

  const value = useMemo(
    () => ({
      isOpen,
      isLoading,
      currentModal,
      modalData,
      loadModal,
      clearModal,
      openSidePanel,
      closeSidePanel,
    }),
    [
      isOpen,
      isLoading,
      currentModal,
      modalData,
      loadModal,
      clearModal,
      openSidePanel,
      closeSidePanel,
    ]
  );

  return (
    <BottomDrawerContext.Provider 
      value={value}
    >
      {children}
    </BottomDrawerContext.Provider>
  );
}

export function useBottomDrawer() {
  const context = useContext(BottomDrawerContext);
  if (!context) {
    throw new Error("useBottomDrawer must be used within BottomDrawerProvider");
  }
  return context;
}