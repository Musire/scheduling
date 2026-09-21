'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import AreaCard from "@/domains/areas/components/AreaCard";
import { Area } from "@/generated/prisma/client";
import ManageTabs from "./ManageTabs";

type Props<T> = {
  items: T[]
}

export default function AreaManagement<T extends Area> ({ 
    items 
}: Props<T>) {

    const { loadModal } = useSidePanel()

    return (
        <section className="pt-6 flex-1 flex flex-col space-y-6">
            <ManageTabs activeValue="areas" />
            <button 
                type="button"
                onClick={() => loadModal('create-area')}
                className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
            >
                + Add
            </button>
            {!!items.length && (
                <div className="stacked space-y-2">
                    {items.map(i => {
                        return (
                            <AreaCard key={i.id} data={i} />
                        )
                    })}
                </div>
            )}
            {!items.length && (
                <div className="">
                    <p className="">no areas found</p>
                </div>
            )}
        </section>
    );
}