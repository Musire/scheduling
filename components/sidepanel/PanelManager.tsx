'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import { useEffect, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function PanelManager() {
    const { isOpen, currentModal, clearModal, modalData } = useSidePanel();

    // Track previous modal state to safely adjust state during render
    const [prevModal, setPrevModal] = useState(currentModal);
    const [renderedModal, setRenderedModal] = useState(currentModal);

    // Adjust state during render phase to prevent synchronous effect setStates
    if (currentModal !== prevModal) {
        setPrevModal(currentModal);
        if (currentModal) {
            setRenderedModal(currentModal);
        }
    }

    // Look up component based on renderedModal so it persists during exit animation
    const ActiveComponent = renderedModal ? PANEL_REGISTRY[renderedModal] : null;

    // Delayed unmount handler when currentModal becomes null
    useEffect(() => {
        if (!currentModal) {
            const timer = setTimeout(() => {
                setRenderedModal(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentModal]);

    return (
        <aside className={`xs:max-md:w-dvw transition-all p-6 flex flex-col duration-300 md:max-w-xl w-full fixed right-0 top-0 bg-background h-dvh ${isOpen ? '': 'translate-x-full'}`}>
            <button type="button" onClick={clearModal} className="self-end text-else hover:text-main cursor-pointer">Close</button>
            {ActiveComponent ? <ActiveComponent data={modalData} /> : null}
        </aside>
    );
}