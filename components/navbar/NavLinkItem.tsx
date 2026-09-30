import { cn } from "@/lib/utils";
import Link from "next/link";
import { Caption } from "../typography";
import { getIcon, IconKey } from "./icon-map";
import { styles } from "./MobileNav";
import { SubComponentProps } from "./NavActionButton";


export default function NavLinkItem({ item, pathname }: SubComponentProps & { pathname: string }) {
  const Icon = getIcon(item.icon as IconKey);
  const isActive = item.index ? pathname === item.href : pathname.startsWith(item.href || '');

  return (
    <Link 
      href={item.href || '#'} 
      className={cn(styles.standard, isActive ? styles.active : styles.inactive)}
    >
      {Icon && (
        <div className={cn("centered rounded-full size-8", isActive ? "text-primary bg-primary/20" : "bg-background/40")}>
          <Icon size={15} />
        </div>
      )}
      <Caption className={cn(isActive && "text-blue-600 dark:text-primary")}>{item.label}</Caption>
    </Link>
  );
}