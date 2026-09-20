import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { deleteRequirement } from "../actions/requirement.actions";

type Props = {
  data?: {
    id: string;
    name: string;
  }
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
            createSuccess('Successfully deleted architect');
          }
        });
        clearDrawer();
      };

    const handleEdit = () => {
        loadSidepanel('update-requirement', { data })
        clearDrawer()
    }

    return (
        <DrawerTemplate
            onDelete={openDrawer}
            onEdit={handleEdit}
            className=""
        >
            <p className="">{data.area.name}</p>
            <DeleteModal 
                modalOpen={isMounted} 
                onClose={closeDrawer} 
                onDelete={handleDelete} 
            />
        </DrawerTemplate>
    );
}