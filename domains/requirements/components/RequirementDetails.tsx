import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { toAppTime } from "@/lib/timeUtils";
import { useTransition } from "react";
import { deleteRequirement } from "../requirement.actions";
import { requirementWithMeta } from "../requirement.types";

type Props = {
  data?: requirementWithMeta
}

export default function RequirmentDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()

    if (!data) return null

    const handleDelete = () => {
        startTransition(async () => {
          if (data?.id) {
            const res = await deleteRequirement({ id: data.id });
            if (!res.success && res.error) {
              createError(res.error);
              return;
            }
            createSuccess('Successfully deleted requirement');
          }
        });
        clearDrawer();
      };

    const handleEdit = () => {
        loadSidepanel('update-requirement', data )
        clearDrawer()
    }

    return (
        <DrawerTemplate
            onDelete={openDrawer}
            onEdit={handleEdit}
            className="stacked items-center space-y-4"
        > 
            <div className="w-5/6 h-20 spaced capitalize">
                <span className="">{data?.area.name}</span>
                <span className="">{data?.role.name}</span>
            </div>
            <div className="w-5/6 h-20 capitalize grid grid-cols-2 gap-x-4">
                <p className="stacked space-y-2">
                  <span className="">Range</span>
                  <span className="">{`${toAppTime(data.startsAt)} - ${toAppTime(data.endsAt)}`}</span>
                </p>
                <p className="stacked items-end space-y-2">
                  <span className="">Shifts</span>
                  <span className="">{`${data._count} / ${data.requiredUsers}`}</span>
                </p>
            </div>
            <DeleteModal 
                modalOpen={isMounted} 
                onClose={closeDrawer} 
                onDelete={handleDelete} 
            />
        </DrawerTemplate>
    );
}