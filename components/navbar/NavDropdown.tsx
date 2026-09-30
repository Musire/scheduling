import { cn } from "@/lib/utils";
import { getIcon, IconKey } from "./icon-map";
import { styles } from "./MobileNav";
import { Caption } from "../typography";
import { SubComponentProps } from "./NavActionButton";


interface DropdownProps extends SubComponentProps {
  pathname: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function NavDropdownButton({ item, pathname, isOpen, onClick }: DropdownProps) {
  const Icon = getIcon(item.icon as IconKey);
  const isChildActive = item.children?.some(child => pathname.startsWith(child.href)) ?? false;
  const isActiveState = isChildActive || isOpen;

  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={cn(styles.standard, isActiveState ? styles.active : styles.inactive)}
    >
      {Icon && (
        <div className={cn(
          "centered rounded-full size-8 transition-transform", 
          isActiveState ? "bg-primary/20 text-primary" : "bg-background/40", 
          isOpen && "scale-110"
        )}>
          <Icon size={15} />
        </div>
      )}
      <Caption className={cn(isActiveState && "text-primary")}>{item.label}</Caption>
    </button>
  );
}