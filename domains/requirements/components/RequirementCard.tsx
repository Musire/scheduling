'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { toAppTime } from "@/lib/timeUtils";

type Props = {
  data: {
    area: {
      id: string;
      name: string;
      
    },
    role: {
      name: string;
    },
    startsAt: Date;
    endsAt: Date;
    _count: string;
    requiredUsers: string
  }
}

export default function RequirementCard ({ data }: Props) {
    const { loadModal } = useBottomDrawer()

    if (!data) return null

    return (
        <article 
          onClick={() => loadModal('requirement-details', {data})}
          className="grid items-center  grid-rows-2 bg-surface-1 cursor-pointer grid-cols-4">
              <p>{data.area.name}</p>
              <p className="row-start-2 col-start-1">{data.role.name}</p>
              <span className="flex items-center space-x-2 row-span-2">
                  <p>{toAppTime(data.startsAt)}</p>
                  <p className="">{`-`}</p>
                  <p>{toAppTime(data.endsAt)}</p>
              </span>
              
              <p className="row-span-2 flex items-center space-x-2">
                  <span className="">{data._count}</span>
                  <span className="">{`-`}</span>
                  <span className="">{data.requiredUsers}</span>
              </p>
          </article>
    );
}