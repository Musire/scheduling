import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { convertParamToString } from "@/lib/manipulateParam";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { deleteRole } from "../role.actions";

type Props = {
  data?: any
}

export default function RoleDetails ({ data }: Props) {
    const { areaSlug } = useParams()
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()

    const handleDelete = () => {
        startTransition(async () => {
            if (data?.id) {
                const cleanSlug = convertParamToString(areaSlug)
                const res = await deleteRole({ id: data.id, areaSlug: cleanSlug });

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
        loadSidepanel('update-role', data)
        clearDrawer()
    }
    return (
        <DrawerTemplate 
            onDelete={openDrawer}
            onEdit={handleEdit}
            className=""
        >
            i am role details
            <DeleteModal modalOpen={isMounted} onDelete={handleDelete} onClose={closeDrawer} />
        </DrawerTemplate>
    );
}