import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { deleteArea } from "@/domains/areas/area.actions";
import RoleCard from "@/domains/roles/components/RoleCard";
import { useDrawer } from "@/hooks";
import { useTransition } from "react";
import { AreaWithRoles } from "../area.types";

type Props = {
  data?: AreaWithRoles
}

export default function AreaDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()

    if (!data) return null

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
        loadSidepanel('update-area', data )
        clearDrawer()
    }

    const handleCreation = () => {
        loadSidepanel('create-role')
        clearDrawer()
    }

    return (
        <DrawerTemplate
            onEdit={handleEdit}
            onDelete={openDrawer} 
            className="flex flex-col items-center"
        >
            <div className=" min-h-20 w-5/6 stacked ">
                <div className="spaced">
                    <h2 className="capitalize text-lg font-semibold ">
                        {data.name}
                    </h2>
                    <button 
                        onClick={handleCreation}
                        type="button" 
                        className="bg-whitesmoke/87 w-20 text-background normal-space rounded-md self-end cursor-pointer"
                    >
                        + Add
                    </button>
                </div>
                <h3 className="capitalize text-else text-sm">roles</h3>
                <div className="pl-4 stacked space-y-2">
                    {!!data.roles.length && data.roles.map(r =>  {
                        return (
                            <RoleCard key={r.id} data={r} />
                        )
                    })}
                </div>
            </div>
            
            <DeleteModal modalOpen={isMounted} onDelete={handleDelete} onClose={closeDrawer} />
        </DrawerTemplate>
    );
}