'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Caption } from '../typography';
import { getIcon, IconKey } from './icon-map';
import { NavItem } from './navconfig';

interface PanelNavProps {
  items: NavItem[];
}

export default function MobileNav({ items }: PanelNavProps) {

  const pathname = usePathname();
  if (!items.length) return null;


  const styles = {
    standard: "  px-3 py-2 transition-colors flex centered-col space-y-1",
    active: " text-main  text-blue-600 ",
    inactive: "text-else hover:text-else  "
  }

  

  return (
    <nav className="centered  w-full space-y-2 z-40">
      <div className="centered rounded-xl surface-1 w-full px-6">
        {items.map(item => {
          const { icon, href, index, label } = item
          const Icon = getIcon(icon as IconKey)
          const isActive = index ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(styles.standard, isActive ? styles.active : styles.inactive)}
            >
              {Icon && (
                <div className={`centered rounded-full size-8 ${isActive ? "bg-blue-300/40 text-blue-600 dark:text-primary dark:bg-primary/20 " : "bg-background/40"}`}>
                  <Icon size={15} />
                </div>
              )}
              <Caption className={`${isActive ? "text-blue-600 dark:text-primary": ""}`} >{label}</Caption>
            </Link>
          );
        })}
      </div>
      
    </nav>
  );
}
