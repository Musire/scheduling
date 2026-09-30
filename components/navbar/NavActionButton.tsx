import { Caption } from "../typography";
import { getIcon, IconKey } from "./icon-map";
import { styles } from "./MobileNav";
import { NavItem } from "./navconfig";

export interface SubComponentProps {
  item: NavItem;
}

export default function NavActionButton({ item, onAction }: SubComponentProps & { onAction: () => void }) {
  const Icon = getIcon(item.icon as IconKey);
  return (
    <button onClick={onAction} className={styles.standard} type="button">
      {Icon && (
        <div className="centered mx-2 rounded-full size-10 bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-transform active:scale-95">
          <Icon size={20} />
        </div>
      )}
      <Caption>{item.label}</Caption>
    </button>
  );
}