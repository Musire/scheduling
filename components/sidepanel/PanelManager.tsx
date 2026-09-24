'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import { useEffect, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function PanelManager() {
  const { isOpen, currentModal, clearModal, modalData } = useSidePanel();

  const [renderedModal, setRenderedModal] = useState<string | null>(currentModal);
  const [activeData, setActiveData] = useState<unknown>(modalData);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currentModal) {
      setRenderedModal(currentModal);
      setActiveData(modalData);
    } else {
      timer = setTimeout(() => {
        setRenderedModal(null);
        setActiveData(null);
      }, 300);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentModal, modalData]);

  const ActiveComponent = renderedModal ? PANEL_REGISTRY[renderedModal] : null;

  return (
    <>
      {/* Backdrop overlay - visible on md screens and above */}
      <div
        onClick={clearModal}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 hidden md:block ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Side Panel */}
      <aside 
        className={`z-50 md:border-l border-border xs:max-md:w-dvw transition-all p-6 flex flex-col duration-300 md:max-w-xl w-full fixed right-0 top-0 bg-background h-dvh ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
    </>
  );
}