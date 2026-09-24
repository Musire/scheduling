'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import { useEffect, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function PanelManager() {
  const { isOpen, currentModal, clearModal, modalData } = useSidePanel();

  // Track active modal & data internally for exit animation retention
  const [renderedModal, setRenderedModal] = useState<string | null>(currentModal);
  const [activeData, setActiveData] = useState<unknown>(modalData);

  useEffect(() => {
    if (currentModal) {
      // Immediately render new modal and cache its data
      setRenderedModal(currentModal);
      setActiveData(modalData);
    } else {
      // Delay unmounting components until exit transition completes (300ms)
      const timer = setTimeout(() => {
        setRenderedModal(null);
        setActiveData(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentModal, modalData]);

  const ActiveComponent = renderedModal ? PANEL_REGISTRY[renderedModal] : null;

  return (
    <aside 
      className={`xs:max-md:w-dvw transition-all p-6 flex flex-col duration-300 md:max-w-xl w-full fixed right-0 top-0 bg-background h-dvh ${
        isOpen ? '' : 'translate-x-full'
      }`}
    >
      <button 
        type="button" 
        onClick={clearModal} 
        className="self-end text-else hover:text-main cursor-pointer"
      >
        Close
      </button>
      {ActiveComponent ? <ActiveComponent data={activeData} /> : null}
    </aside>
  );
}