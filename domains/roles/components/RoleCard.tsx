import { DeleteModal } from "@/components/modal";
import { useToast } from "@/context";
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useSidePanel } from "@/context/SidepanelProvider";
import { useDrawer } from "@/hooks";
import { convertParamToString } from "@/lib/manipulateParam";
import { useParams } from "next/navigation";
import { MouseEvent, useTransition } from "react";
import { deleteRole } from "../role.actions";

type Props = {
  data?: {
    id: string;
    name: string
  }
}

export default function RoleCard ({ data }: Props) {
	const [pending, startTransition] = useTransition();
	const { loadModal: loadSidepanel,  } = useSidePanel()
	const { clearModal: clearDrawer } = useBottomDrawer()
	const { createSuccess, createError } = useToast();
	const { isMounted, toggleDrawer } = useDrawer()
	const { isMounted: modalOpen, openDrawer: openModal, closeDrawer: closeModal } = useDrawer()
	const { areaSlug } = useParams()

	if (!data) return null

	const handleDelete = () => {
		startTransition(async () => {
			if (data?.id) {
			const res = await deleteRole({ id: data.id, areaSlug: convertParamToString(areaSlug) });
			if (!res.success && res.error) {
				createError(res.error);
				return;
			}
			createSuccess('Successfully deleted requirement');
			}
		});
		clearDrawer();
	};

	const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		loadSidepanel('update-role', data)
	}
  
    return (
        <article
			onClick={toggleDrawer}
          	className="p-4 stacked h-fit cursor-pointer border-border border rounded-lg "
		>
            <p className="text-main text-xl capitalize">{data?.name}</p>
			{isMounted && <div className="w-full spaced">
                <button type="button" onClick={openModal} className="normal-space rounded-full bg-surface-1 cursor-pointer text-error w-20 hover:bg-surface-2">Delete</button>
                <button type="button" onClick={e => handleEdit(e)} className="normal-space rounded-full bg-surface-1 cursor-pointer text-main w-20 hover:bg-surface-2">Edit</button>
            </div>}
			<DeleteModal modalOpen={modalOpen} onClose={closeModal} onDelete={handleDelete} />
        </article>
    );
}