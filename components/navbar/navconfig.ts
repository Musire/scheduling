import { UserRole } from "@/generated/prisma/enums";


export type Role = 'MANAGER' | 'ENDUSER' 

export type NavItem = {
  label?: string;
  href?: string; 
  icon?: string;
  index?: boolean;
  isAction?: boolean; 
  children?: { label: string; href: string }[]; // 👈 Added for dropdown menus
}

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
      children: [
        { label: 'Areas', href: '/manage/areas' },
        { label: 'Requirements', href: '/manage/requirements' },
        { label: 'Users', href: '/manage/users' }
      ]
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
      label: 'Schedule',
      icon: 'schedule',
      href: `/schedule`,
    },
    {
      href: 'tinkering'
    },
    {
      href: 'tinkering2'
    },
    {},
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
}

export function getNav(role: UserRole) {
  return navByRole[role] ?? []
}