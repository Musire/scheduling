'use client';

import Link from "next/link";
import { ContainerMode } from "../../types";

interface ContinueProps {
    mode: ContainerMode;
    hasSelection: boolean;
    onDelete: () => void;
    href: string,
}

export default function ContinueButton ({ 
    mode, 
    hasSelection, 
    onDelete, 
    href
}: ContinueProps) {
    if (!hasSelection || mode === 'view') return null;

    if (mode === 'delete') {
        return (
            <button
                onClick={onDelete}
                type="button" 
                className="absolute bottom-2 bg-whitesmoke text-background normal-space rounded-lg hover:cursor-pointer right-0 animate-fadeIn">
                Continue
            </button>
        )
    }

    if (mode === 'edit') {
        return (
            <Link
                href={href}
                className="absolute bottom-2 bg-whitesmoke text-deep normal-space rounded-lg hover:cursor-pointer right-0 animate-fadeIn"
            >
                Continue
            </Link>
        )
    }

}