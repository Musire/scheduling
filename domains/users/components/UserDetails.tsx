import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { formatCurrency } from "@/lib/manipulateString";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { deleteUser } from "../user.actions";

type Props = {
  data?: {
    id: string;
    name: string;
    email: string;
    payRate: number;
  }
}

export default function UserDetails ({ data }: Props) {
    const [pending, startTransition] = useTransition();
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    const { createSuccess, createError } = useToast();
    const { isMounted, openDrawer, closeDrawer } = useDrawer()
    
    const searchParams = useSearchParams()
    const week = searchParams.get('week')
    
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
            <div className="grid grid-cols-3 items-center gap-x-6">
                <div className="bg-surface-2 size-32 rounded-full" />
                <p className="stacked space-y-2 self-end">
                    <span className="text-xl">{data.name}</span>
                    <span className="text-sm text-else ">{data.email}</span>
                </p>
                <p className="">
                    <span className="text-lg ">{`35 / 40 hrs`}</span>
                    <span className="">{`${formatCurrency(data.payRate)} / hr`}</span>
                </p>
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