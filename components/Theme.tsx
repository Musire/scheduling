'use client';

import { useThemeState } from "@/hooks";
import { Moon, Sun } from "lucide-react";

export default function Theme() {
    const { toggleTheme } = useThemeState();

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                toggleTheme();
            }}
            type="button"
            aria-label="Toggle Theme"
            className="relative surface-2 rounded-full h-7 px-1 py-1 w-14 flex items-center cursor-pointer"
        >
            {/* The moving slider circle */}
            <div className="size-6 p-1 flex items-center justify-center rounded-full bg-background transition-transform duration-200 ease-in-out pointer-events-none transform dark:translate-x-6 translate-x-0 dark:border dark:border-border">
                {/* Sun shows by default, hides in dark mode */}
                <Sun size={14} className="block dark:hidden" />
                {/* Moon hides by default, shows in dark mode */}
                <Moon size={14} className="hidden dark:block" />
            </div>
        </button>
    );
}
