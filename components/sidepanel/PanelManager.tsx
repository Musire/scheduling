'use client';
import { useSidePanel } from "@/context/SidepanelProvider";
import { useEffect, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function PanelManager () {
    const { isOpen, currentModal } = useSidePanel()
    const [renderedModal, setRenderedModal] = useState(currentModal);
    const ActiveComponent = currentModal ? PANEL_REGISTRY[currentModal] : null;

    useEffect(() => {
        if (currentModal) {
            setRenderedModal(currentModal);
        } else {
            const timer = setTimeout(() => {
                setRenderedModal(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentModal]);

    return (
        <aside className={`xs:max-md:w-dvw transition-all duration-300 md:max-w-xl w-full fixed right-0 top-0 bg-background/60 backdrop-blur-sm h-dvh ${isOpen ? '': 'translate-x-full'}`}>
            {ActiveComponent ? <ActiveComponent /> : null}
        </aside>
    );
}