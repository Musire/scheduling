'use client';

import { useSidePanel } from "@/context/SidepanelProvider";
import { RequirementFilters, useMultiFilter } from "@/hooks/useMultiFilter";
import { useCallback } from "react";
import { requirementWithMeta } from "../requirement.types";
import FilterButton from "./FilterButton";
import RequirementCard from "./RequirementCard";

type Props = {
  requirements: requirementWithMeta[]
}


export default function RequirementMangement ({ requirements }: Props) {
    const { loadModal } = useSidePanel()

    const filterFn = useCallback((item: requirementWithMeta, f: RequirementFilters) => {
        const matchesArea = 
            f.areas.length === 0 || f.areas.includes(item.areaId);

        const matchesDay = 
            f.weekdays.length === 0 || f.weekdays.includes(item.dayOfWeek);

        return matchesArea && matchesDay;
    }, []);

    const { filters, setFilter, filteredData, resetFilters } = useMultiFilter(
        requirements,
        {
            weekdays: [] as number[],
            areas: [] as string[],
        },
        filterFn
    );

    return (
        <section className="py-6 flex-1 stacked">
            <div className="spaced">
                <span className="text-2xl font-light">Requirements</span>
                <FilterButton 
                    filters={filters} 
                    setFilter={setFilter}
                    resetFilters={resetFilters}    
                />
                <button 
                    type="button"
                    onClick={() => loadModal('create-requirement')}
                    className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
                >
                    + Add
                </button>
            </div>
            {!!filteredData.length && (
                <div className="grid xs:max-md:grid-cols-2 md:grid-cols-3 gap-x-4">
                    {filteredData?.map(r => {
                        return (
                            <RequirementCard key={r?.id} data={r} />
                        )
                })}
                </div>
            )}
            {!filteredData.length && (
                <div className="flex-1 centered">
                    <p className="">No requirments set up</p>
                </div>
            )}
        </section>
    );
}