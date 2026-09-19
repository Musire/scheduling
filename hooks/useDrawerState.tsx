import { useCallback, useState } from "react";
import { LoadModalOptions, useFetchState } from "./useFetchState";

export function useDrawerState() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  
  const { data: modalData, isLoading, loadData, resetFetch } = useFetchState();

  const openSidePanel = useCallback(() => setIsOpen(true), []);
  const closeSidePanel = useCallback(() => setIsOpen(false), []);

  const loadModal = useCallback(<T, A extends any[]>(modal: string, options?: LoadModalOptions<T, A>) => {
    setCurrentModal(modal);
    setIsOpen(true);
    loadData(options);
  }, [loadData]);

  const clearModal = useCallback(() => {
    resetFetch();
    setCurrentModal(null);
    setIsOpen(false);
  }, [resetFetch]);

  return {
    isOpen,
    isLoading,
    currentModal,
    modalData,
    loadModal,
    clearModal,
    openSidePanel,
    closeSidePanel,
  };
}