import { Caption } from "../typography";
import { ICON_MAP, IconKey } from "./icon-map";
import { styles } from "./MobileNav";
import { NavItem } from "./navconfig";

export interface SubComponentProps { 
  item: NavItem; 
} 

function NavIcon({ icon }: { icon: IconKey }) {
  const Icon = ICON_MAP[icon];

  if (!Icon) return null;

  return <Icon size={20} />;
}

export default function NavActionButton({
  item,
  onAction,
}: SubComponentProps & { onAction: () => void }) {
  return (
    <button onClick={onAction} className={styles.standard} type="button">
      <div className="centered mx-2 size-10 rounded-full bg-blue-600 text-white shadow-md transition-transform hover:bg-blue-700 active:scale-95">
        <NavIcon icon={item.icon as IconKey} />
      </div>

      <Caption>{item.label}</Caption>
    </button>
  );
}