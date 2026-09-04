'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Caption } from '../typography';
import { getIcon, IconKey } from './icon-map';
import { NavItem } from './navconfig';
import { useSidePanel } from '@/context/SidepanelProvider';

interface MobileNavProps {
  items: NavItem[];
  onOpenModal: () => void; // Added prop
}

export default function MobileNav({ items, onOpenModal }: MobileNavProps) {
  const pathname = usePathname();
  const {loadModal} = useSidePanel()
  if (!items.length) return null;

  const styles = {
    standard: "px-3 py-2 transition-colors flex centered-col space-y-1",
    active: "text-main text-blue-600",
    inactive: "text-else hover:text-else"
  };

  return (
    <nav className="centered w-full space-y-2 z-40">
      <div className="centered rounded-xl surface-1 w-full px-6 justify-around">
        {items.map(item => {
          const { icon, href, index, label, isAction } = item;
          const Icon = getIcon(icon as IconKey);

          // Handle Action Button (Modal trigger)
          if (isAction) {
            return (
              <button
                key={label}
                onClick={() => loadModal('create-shift')}
                className={styles.standard}
                type="button"
              >
                {Icon && (
                  <div className="centered rounded-full size-10 bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-transform active:scale-95">
                    <Icon size={20} />
                  </div>
                )}
                <Caption>{label}</Caption>
              </button>
            );
          }

          // Regular Link items
          const isActive = index ? pathname === href : pathname.startsWith(href || '');
          return (
            <Link
              key={href}
              href={href || '#'}
              className={clsx(styles.standard, isActive ? styles.active : styles.inactive)}
            >
              {Icon && (
                <div className={`centered rounded-full size-8 ${isActive ? "bg-blue-300/40 text-blue-600 dark:text-primary dark:bg-primary/20" : "bg-background/40"}`}>
                  <Icon size={15} />
                </div>
              )}
              <Caption className={`${isActive ? "text-blue-600 dark:text-primary": ""}`}>{label}</Caption>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}