import { UserRole } from "@/generated/prisma/enums"

export type NavItem = {
  label: string
  href?: string // Make href optional since an action button might not link anywhere
  icon?: string
  index?: boolean
  isAction?: boolean // Flag to identify the modal button
}

export type Role = 'MANAGER' | 'ENDUSER' 

export const navByRole: Record<UserRole, NavItem[]> = {
  MANAGER: [
    { 
      label: 'Schedule',
      icon: 'schedule',
      href: `/schedule`,
    },
    { 
      label: 'Manage',
      icon: 'manage',
      href: `/manage/areas` 
    },
    {
      label: 'Add',
      icon: 'plus', 
      isAction: true,
    },
    { 
      label: 'Messages',
      icon: 'messages',
      href: `/messages` 
    },
    { 
      label: 'Account',
      icon: 'account',
      href: `/account` 
    },
  ],
  END_USER: [
      { 
        label: 'Inicio', 
        href: `/dashboard`,
        icon: 'home',
        index: true 
      },
      { 
        label: 'Historial', 
        href: `/history`,
        icon: 'history'
      },
      { 
        label: 'Reserva', 
        icon: 'booking',
        href: `/booking` 
      },
  ],
}

export function getNav(role: UserRole) {
  return navByRole[role] ?? []
}