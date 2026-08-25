'use client';

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type BackButtonProps = {
    className?: string;
    href?: string;
}

export default function BackButton ({ className, href }: BackButtonProps) {
    const router = useRouter();
    const handleAction = () => {
        if (href) {
            router.push(href)
            return;
        }
        router.back()
    }

    return (
    <button 
        type='button' 
        onClick={handleAction} 
        className={cn('spaced space-x-3 text-whitesmoke/60 hover:text-whitesmoke active:text-whitesmoke hover:cursor-pointer', className)}
    >
        <ArrowLeft size={20} />
    </button>
    );
}