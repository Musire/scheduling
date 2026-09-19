import DrawerTemplate from "@/components/bottomdrawer/DrawerTemplate";
import { DeleteModal } from "@/components/modal";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";

type Props = {
  data: {
    name: string;
  }
}

export default function UserDetails ({ data }: Props) {
    const { loadModal: loadSidepanel,  } = useSidePanel()
    const { clearModal: clearDrawer } = useBottomDrawer()
    
    if (!data) return null

    const { isMounted, openDrawer, closeDrawer } = useDrawer()

    const handleDelete = () => {

    }

    const handleEdit = () => {
        loadSidepanel('update-user', { data })
        clearDrawer()
    }

    return (
        <DrawerTemplate
            onDelete={openDrawer}
            onEdit={handleEdit}
            className=""
        >
            <p className="">{data.name}</p>
            <DeleteModal 
                modalOpen={isMounted} 
                onClose={closeDrawer} 
                onDelete={handleDelete} 
            />
        </DrawerTemplate>
    );
}