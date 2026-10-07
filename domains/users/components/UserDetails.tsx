import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { formatCurrency } from "@/lib/manipulateString";
import { useTransition } from "react";
import { InviteActionButton } from "../../invites/components/InviteActionButton";
import { deleteUser } from "../user.actions";
import { ExpectedUser } from "../user.types";

type Props = {
  data?: ExpectedUser
}

export default function UserDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()
    
    if (!data) return null

    const handleDelete = () => {
        startTransition(async () => {
            if (data.id) {
            const res = await deleteUser({ id: data.id });
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
        loadSidepanel('update-user', data )
        clearDrawer()
    }

    return (
        <DrawerTemplate
            onDelete={openDrawer}
            onEdit={handleEdit}
            className="stacked items-center "
        >
            <div className="grid grid-cols-2 items-center gap-x-6">
                <div className="bg-surface-2 size-32 rounded-full row-span-2" />
                <p   className="text-xs text-alternate  text-right">{`${formatCurrency(data.payRate ?? 0)} / hr - 35 / 40 hrs`}</p>
                <p className="stacked space-y-2 self-end ">
                    <span className="text-xl">{data.name}</span>
                    <span className="text-sm text-else ">{data.email}</span>
                </p>
            </div>
            <div className="w-full flex justify-end">
                <InviteActionButton  
                    invitation={{ 
                        id: data.invitation?.id, 
                        status: data.invitation?.status}}
                    target={{ 
                        email: data.email, 
                        id: data.id }}
                />
            </div>
            <div className="w-full">
                <p className="text-else text-left text-xs">Availability</p>
                <p className="ml-4 mt-4">coming soon</p>
            </div>
            <div className="w-full">
                <p className="text-else text-left text-xs">Shifts</p>
                <p className="ml-4 mt-4">coming soon</p>
            </div>
            <DeleteModal 
                modalOpen={isMounted} 
                onClose={closeDrawer} 
                onDelete={handleDelete} 
            />
        </DrawerTemplate>
    );
}