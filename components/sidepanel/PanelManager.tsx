'use client';
import { useSidePanel } from "@/context/SidepanelProvider";
import { useEffect, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function PanelManager () {
    const { isOpen, currentModal, clearModal } = useSidePanel()
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
        <aside className={`xs:max-md:w-dvw transition-all p-6 flex flex-col duration-300 md:max-w-xl w-full fixed right-0 top-0 bg-background h-dvh ${isOpen ? '': 'translate-x-full'}`}>
            <button type="button" onClick={clearModal} className="self-end text-else hover:text-main cursor-pointer">Close</button>
            {ActiveComponent ? <ActiveComponent /> : null}
        </aside>
    );
}