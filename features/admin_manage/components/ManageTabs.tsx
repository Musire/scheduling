'use client';

import Link from "next/link";

const tabs = [
    {
        id: 'tab-link-areas',
        href: 'areas',
    },
    {
        id: 'tab-link-requirements',
        href: 'requirements',
    },
    {
        id: 'tab-link-users',
        href: 'users',
    }
]

type Props = {
  href: string;
  isActive: boolean
}

export function TabLink ({href, isActive}: Props) {
    const shared = 'normal-space grow capitalize border-b border-whitesmoke/30 text-center'
    const inactive = ' text-else hover:text-main'
    const active = ' border-whitesmoke/87'

    return (
        <li className="flex flex-1">
            <Link 
                href={`/manage/${href}`}
                className={`${shared} ${isActive ? active : inactive}`}
            >
                {href}
            </Link>
        </li>
    );
}

type ManageProps = {
  activeValue: string;
}

export default function ManageTabs ({ activeValue }: ManageProps) {

    return (
        <ul className=" max-w-full flex ">
            {tabs?.map(t => (
                <TabLink 
                    key={t.id} 
                    href={t.href} 
                    isActive={activeValue === t.href}
                />
            ))}
        </ul>
    );
}