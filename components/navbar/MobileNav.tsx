'use client';

import { useSidePanel } from '@/context/SidepanelProvider';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import NavActionButton from './NavActionButton';
import { NavItem } from './navconfig';
import NavDropdownButton from './NavDropdown';
import NavLinkItem from './NavLinkItem';

interface MobileNavProps {
  items: NavItem[];
}

export const styles = {
  standard: "px-3 py-2 cursor-pointer transition-colors flex centered-col space-y-1 relative raw-button-reset",
  active: "text-main text-blue-600",
  inactive: "text-else hover:text-else"
};

export default function MobileNav({ items }: MobileNavProps) {
  const pathname = usePathname();
  const { loadModal } = useSidePanel();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!items.length) return null;

  // Find the 'Manage' item to extract its children for the dropdown menu
  const manageItem = items.find(i => i.label === 'Manage');

  return (
    <nav className="relative w-full z-100">
      {/* 🔹 DROPDOWN DRAWER PANEL */}
      {isDropdownOpen && manageItem?.children && (
        <div className="fixed bottom-24 z-110 left-12 w-48 surface-1 rounded-xl shadow-xl p-4 border border-border animate-in slide-in-from-bottom-2 duration-200">
          <ul className="flex flex-col space-y-2">
            {manageItem.children.map(subItem => {
              const isSubActive = pathname === subItem.href;
              return (
                <li key={subItem.href}>
                  <Link
                    href={subItem.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className={clsx(
                      "block px-4 py-2.5 rounded-lg text-sm transition-colors",
                      isSubActive 
                        ? " font-medium bg-primary/10 text-primary" 
                        : "text-else hover:bg-background/60"
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
          // 1️⃣ Handle Modal Action Buttons
          if (item.isAction) {
            return (
              <NavActionButton 
                key={`navlink-${item.label}`} 
                item={item} 
                onAction={() => loadModal('create-shift')} 
              />
            );
          }

          // 2️⃣ Handle Dropdown Trigger Button (Manage)
          if (item.children) {
            return (
              <NavDropdownButton
                key={item.label}
                item={item}
                pathname={pathname}
                isOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
            );
          }

          // 3️⃣ Regular Link items
          return (
            <NavLinkItem 
              key={item.href} 
              item={item} 
              pathname={pathname} 
            />
          );
        })}
      </div>
    </nav>
  );
}