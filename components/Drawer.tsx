'use client'
import { AnimationState } from "@/hooks/useDrawer";

type Props = {
    animation: AnimationState;
    isMounted: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    withOverlay?: boolean;
}

export default function Drawer({ animation, isMounted, children, onClose, withOverlay }: Props) {
    // If hook says it's not mounted, don't render anything
    if (!isMounted) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-end transition-all ${
                animation ? "pointer-events-auto" : "pointer-events-none"
            }`}
        >
            {/* 1. Background Overlay */}
            {withOverlay && (
                <div 
                    className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out ${
                        animation ? 'opacity-100' : 'opacity-0'
                    }`} 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents click bubbling
                        onClose?.();
                    }}
                    aria-hidden="true"
                />
            )}
            
            {/* 2. Drawer Content Wrapper */}
            {/* We use pointer-events-auto here so buttons inside the drawer still work */}
            <div 
                className={`relative h-full pointer-events-auto ${
                    animation ? 'animate-ghostIn' : 'animate-ghostOut'
                }`}
            >
                {children}
            </div>
        </div>
    );
}
