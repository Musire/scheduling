'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { toAppTime } from "@/lib/timeUtils";
import { requirementWithMeta } from "../requirement.types";

type Props = {
  data: requirementWithMeta
}

export default function RequirementCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()

    if (!data) return null

    return (
        <article 
          onClick={() => loadModal('requirement-details', {data})}
          className="grid items-center p-4 place-content-center grid-rows-2 bg-surface-1 cursor-pointer grid-cols-[1fr_2fr_1fr] gap-x-4">
              <p>{data.area.name}</p>
              <p className="row-start-2 col-start-1">{data.role.name}</p>
              <p className="flex items-center rows-span-2  space-x-2 row-span-2">
                  {`${toAppTime(data.startsAt)} - ${toAppTime(data.endsAt)}`}
              </p>
              
              <p className="row-span-2 flex items-center space-x-2 ">
                  <span className="">{data._count}</span>
                  <span className="">{`-`}</span>
                  <span className="">{data.requiredUsers}</span>
              </p>
          </article>
    );
}