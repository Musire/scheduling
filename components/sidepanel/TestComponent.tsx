'use client';

import { useSidePanel } from "@/context/SidepanelProvider";

export default function TestComponent () {
    const {clearModal} = useSidePanel()
    return (
        <div className="stacked p-6">
            <span className="">i am a test</span>
            <button 
                type="button" 
                className="bg-whitesmoke text-deep h-14 normal-space cursor-pointer"
                onClick={clearModal}
            >
                close side panel
            </button>
        </div>
    );
}