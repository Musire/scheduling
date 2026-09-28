'use client';

import { useSidePanel } from '@/context/SidepanelProvider';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NavItem } from './navconfig';

interface PanelNavProps {
  items: NavItem[];
}

export default function PanelNav({ items }: PanelNavProps) {
  const { loadModal } = useSidePanel();
  const pathname = usePathname();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!items.length) return null;

  return (
    <nav className="flex items-center border-b border-border xs:w-full md:w-[85dvw] lg:w-[70dvw] !overflow-visible my-6 relative z-30">
      {items.map(item => {
        const { label, href, index, isAction, children } = item;

        // 1️⃣ Action Button (Modal trigger)
        if (isAction) {
          return (
            <button
              key={label}
              onClick={() => loadModal('create-shift')}
              type="button"
              className=" centered normal-space rounded-full cursor-pointer bg-blue-500 text-whitesmoke shadow-md hover:bg-blue-700 transition-transform active:scale-95 px-4 py-1.5 text-sm ml-4"
            >
              <span>{label}</span>
            </button>
          );
        }

        // 2️⃣ Dropdown Trigger (Manage Menu)
        if (children) {
          const isChildActive = children.some(child => pathname.startsWith(child.href));
          
          return (
            <div key={label} ref={dropdownRef} className="relative overflow-visible! h-full flex items-center group/manage">
              {/* Interactive Click Toggle Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                  'px-3 py-2 transition-colors font-medium text-sm flex items-center gap-1 cursor-pointer bg-transparent border-none outline-none select-none',
                  (isChildActive || isOpen) ? 'text-main' : 'text-else group-hover/manage:text-main' // 🛠️ FIX: Added group/manage hover state fallback
                )}
              >
                {label}
                <svg 
                  className={clsx("size-4 opacity-60 transition-transform duration-200", isOpen && "rotate-180")} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Active Tab Underline */}
              {(isChildActive || isOpen) && (
                <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-main z-10" />
              )}

              {/* 🖥️ Dropdown Menu Box */}
              {isOpen && (
                <ul className="absolute left-0 top-full mt-2 w-48 bg-surface-1 rounded-xl shadow-xl p-2 border border-border block min-h-max z-50">
                  {children.map(subItem => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      // 🛠️ FIX: Added group class to list elements to control nested typography changes
                      <li key={subItem.href} className="block w-full group/subitem">
                        <Link
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className={clsx(
                            'block w-full px-4 py-2 rounded-lg text-sm text-left transition-colors cursor-pointer pointer-events-auto',
                            isSubActive 
                              ? 'bg-surface-2 text-main font-medium group-hover/subitem:text-whitesmoke' 
                              : 'text-else bg-transparent group-hover/subitem:bg-surface-3 group-hover/subitem:text-main' // 🛠️ FIX: Rewritten to group/subitem definitions
                          )}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        }

        // 3️⃣ Regular Link items (Profile, etc.)
        const isActive = index ? pathname === href : pathname.startsWith(href || '');
        return (
          // 🛠️ FIX: Wrapped in named group to force active text highlight regardless of viewport configuration hooks
          <Link
            key={href}
            href={href || '#'}
            className={clsx(
              'px-3 py-2 transition-colors relative text-sm font-medium group/item pointer-events-auto',
              isActive ? 'text-main' : 'text-else'
            )}
          >
            <span className={clsx(
              "transition-colors",
              !isActive && "group-hover/item:text-main" // 🛠️ FIX: Text color changes explicitly when parent container catches cursor coordinates
            )}>
              {label}
            </span>
            {isActive && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-main" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
