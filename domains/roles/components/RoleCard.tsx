import { useBottomDrawer } from "@/context/BottomDrawerProvider";

type Props = {
  data?: {
    id: string;
    name: string
  }
}

export default function RoleCard ({ data }: Props) {
  const { loadModal: loadBottomDrawer } = useBottomDrawer() 
    return (
        <article 
          onClick={() => loadBottomDrawer('role-details', { data })}
          className="p-4 cursor-pointer bg-surface-1 ">
            <p className="text-main text-xl capitalize">{data?.name}</p>
        </article>
    );
}