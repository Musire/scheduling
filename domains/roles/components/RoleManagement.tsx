'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import RoleCard from "@/domains/roles/components/RoleCard";
import { Area } from "@/generated/prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ManageTabs from "../../../features/admin_manage/components/ManageTabs";

type Props<T> = {
  items: T[]
}

export default function RoleManagement<T extends Area> ({ 
    items 
}: Props<T>) {

    const { loadModal } = useSidePanel()
    const currentPath = usePathname()
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/'

    return (
        <section className="pt-6 flex-1 flex flex-col space-y-6">
            <ManageTabs activeValue="areas" />
            <div className="spaced">
                <Link
                    href={parentPath} 
                    className="w-12 hover:bg-surface-1 cursor-pointer centered normal-space rounded-lg"
                >
                    <ArrowLeft />
                </Link>
                <button 
                    type="button"
                    onClick={() => loadModal('create-role')}
                    className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
                >
                    + Add
                </button>
            </div>
            {!!items.length && (
                <div className="grid grid-cols-2 gap-4">
                    {items.map(i => {
                        return (
                            <RoleCard key={i.id} data={i} />
                        )
                    })}
                </div>
            )}
            {!items.length && (
                <div className="centered flex-1 ">
                    <p className="">no roles found</p>
                </div>
            )}
        </section>
    );
}