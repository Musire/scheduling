'use client';
import { useSidePanel } from '@/context/SidepanelProvider';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react'; // 👈 Added state hook
import { Caption } from '../typography';
import { getIcon, IconKey } from './icon-map';
import { NavItem } from './navconfig';

interface MobileNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const { loadModal } = useSidePanel();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 👈 Controls drawer visibility

  if (!items.length) return null;

  const styles = {
    standard: "px-3 py-2 cursor-pointer transition-colors flex centered-col space-y-1 relative raw-button-reset",
    active: "text-main text-blue-600",
    inactive: "text-else hover:text-else"
  };

  return (
    <nav className="relative w-full z-40">
      {/* 🔹 DROPDOWN DRAWER PANEL (Renders above the nav bar if open) */}
      {isDropdownOpen && (
        <div className="absolute bottom-24 left-0 w-full surface-1 rounded-xl shadow-xl p-4 border border-slate-200 dark:border-slate-800 animate-in slide-in-from-bottom-2 duration-200">
          <ul className="flex flex-col space-y-2">
            {items.find(i => i.label === 'Manage')?.children?.map(subItem => {
              const isSubActive = pathname === subItem.href;
              return (
                <li key={subItem.href}>
                  <Link 
                    href={subItem.href}
                    onClick={() => setIsDropdownOpen(false)} // Close drawer on navigation
                    className={clsx(
                      "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                      isSubActive ? "bg-blue-50 text-blue-600 font-medium dark:bg-primary/10 dark:text-primary" : "text-else hover:bg-background/60"
                    )}
                  >
                    {subItem.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 🔹 MAIN NAVIGATION BAR */}
      <div className="centered rounded-xl surface-1 w-full px-6 justify-around h-16 shadow-lg">
        {items.map(item => {
          const { icon, href, index, label, isAction, children } = item;
          const Icon = getIcon(icon as IconKey);

          // 1️⃣ Handle Modal Action Buttons
          if (isAction) {
            return (
              <button key={`navlink-${label}`} onClick={() => loadModal('create-shift')} className={styles.standard} type="button">
                {Icon && (
                  <div className="centered mx-2 rounded-full size-10 bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-transform active:scale-95">
                    <Icon size={20} />
                  </div>
                )}
                <Caption>{label}</Caption>
              </button>
            );
          }

          // 2️⃣ Handle Dropdown Trigger Button (Manage)
          if (children) {
            const isChildActive = children.some(child => pathname.startsWith(child.href));
            return (
              <button 
                key={label} 
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={clsx(styles.standard, isChildActive || isDropdownOpen ? styles.active : styles.inactive)}
              >
                {Icon && (
                  <div className={clsx("centered rounded-full size-8 transition-transform", (isChildActive || isDropdownOpen) ? "bg-blue-300/40 text-blue-600 dark:bg-primary/20 dark:text-primary" : "bg-background/40", isDropdownOpen && "scale-110")}>
                    <Icon size={15} />
                  </div>
                )}
                <Caption className={clsx((isChildActive || isDropdownOpen) && "text-blue-600 dark:text-primary")}>{label}</Caption>
              </button>
            );
          }

          // 3️⃣ Regular Link items
          const isActive = index ? pathname === href : pathname.startsWith(href || '');
          return (
            <Link key={href} href={href || '#'} className={clsx(styles.standard, isActive ? styles.active : styles.inactive)}>
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
