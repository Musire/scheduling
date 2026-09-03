import type { LucideIcon } from 'lucide-react'
import {
    CalendarCheck2,
    LayoutGrid,
    MessageSquare,
    Users,
    Plus,
    UserShield
} from 'lucide-react'

export const iconMap = {
    schedule: CalendarCheck2,
    manage: LayoutGrid,
    users: Users,
    plus: Plus,
    account: UserShield,
    messages: MessageSquare
} as const

export type IconKey = keyof typeof iconMap

export function getIcon(key?: IconKey): LucideIcon | null {
    return key ? iconMap[key] : null
}