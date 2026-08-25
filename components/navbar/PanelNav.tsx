'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './navconfig';

interface PanelNavProps {
  items: NavItem[];
}

export default function PanelNav({ items }: PanelNavProps) {
  const pathname = usePathname();
  
  if (!items.length) return null;

  return (
    <nav className="flex border-b border-border xs:w-full md:w-[85dvw] lg:w-[70dvw] overflow-x-hidden my-6">
      {items.map(item => {
        const { label, href, index } = item
        const isActive = index ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
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
