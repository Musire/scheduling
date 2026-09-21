import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { deleteArea } from "@/domains/areas/area.actions";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";

type Props = {
  data?: any
}

export default function AreaDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()

    if (!data) return null

    console.log(data)

    const handleDelete = () => {
        startTransition(async () => {
            if (data?.id) {
            const res = await deleteArea({ id: data.id });
            if (!res.success && res.error) {
                createError(res.error);
                return;
            }
            createSuccess('Successfully deleted area');
            }
        });
        clearDrawer();
        };

    const handleEdit = () => {
        loadSidepanel('update-area', { data })
        clearDrawer()
    }
    return (
        <DrawerTemplate
            onEdit={handleEdit}
            onDelete={openDrawer} 
            className=""
        >
            <p className="">
                {data.name}
            </p>
            <DeleteModal modalOpen={isMounted} onDelete={handleDelete} onClose={closeDrawer} />
        </DrawerTemplate>
    );
}