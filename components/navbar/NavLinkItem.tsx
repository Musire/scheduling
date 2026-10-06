import { cn } from "@/lib/utils";
import { Caption } from "../typography";
import { ICON_MAP, IconKey } from "./icon-map";
import { SubComponentProps } from "./NavActionButton";

export default function NavLinkItem({
  item,
  pathname,
}: SubComponentProps & { pathname: string }) {
  const Icon = ICON_MAP[item.icon as IconKey];
  const isActive = item.index
    ? pathname === item.href
    : pathname.startsWith(item.href || "");

  return (
    <a href={item.href} className={cn(/* your existing classes */)}>
      {Icon && (
        <div
          className={cn(
            "centered size-8 rounded-full",
            isActive ? "bg-primary/20 text-primary" : "bg-background/40"
          )}
        >
          <Icon size={15} />
        </div>
      )}
      <Caption
        className={cn(isActive && "text-blue-600 dark:text-primary")}
      >
        {item.label}
      </Caption>
    </a>
  );
}