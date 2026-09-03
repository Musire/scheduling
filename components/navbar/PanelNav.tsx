'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './navconfig';

interface PanelNavProps {
  items: NavItem[];
  onOpenModal: () => void; // Added prop
}

export default function PanelNav({ items, onOpenModal }: PanelNavProps) {
  const pathname = usePathname();
  
  if (!items.length) return null;

  return (
    <nav className="flex items-center border-b border-border xs:w-full md:w-[85dvw] lg:w-[70dvw] overflow-x-hidden my-6">
      {items.map(item => {
        const { label, href, index, isAction } = item;

        // Handle Action Button (Modal trigger)
        if (isAction) {
          return (
            <button
              key={label}
              onClick={onOpenModal}
              type="button"
              className="px-3 py-2 transition-colors text-else hover:text-main flex items-center gap-1.5"
            >
              <span>{label}</span>
            </button>
          );
        }

        // Regular Link items
        const isActive = index ? pathname === href : pathname.startsWith(href || '');
        return (
          <Link
            key={href}
            href={href || '#'}
            className={clsx(
              'px-3 py-2 transition-colors',
              isActive ? 'border-b-2 border-main text-main' : 'text-else hover:text-else'
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}