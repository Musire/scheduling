import type { LucideIcon } from 'lucide-react';
import {
    CalendarCheck2,
    LayoutGrid,
    MessageSquare,
    Plus,
    Users,
    UserShield,
} from 'lucide-react';

// 1. Export the static map for direct indexing (ICON_MAP[key]) in React components
export const ICON_MAP = {
  schedule: CalendarCheck2,
  manage: LayoutGrid,
  users: Users,
  plus: Plus,
  account: UserShield,
  messages: MessageSquare,
} as const;

export type IconKey = keyof typeof ICON_MAP;

// 2. Export helper for non-JSX contexts or dynamic lookups outside component bodies
export function getIcon(key?: IconKey): LucideIcon | null {
  return key && key in ICON_MAP ? ICON_MAP[key] : null;
}