'use client';

import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";
import ManageTabs from "./ManageTabs";

type Props<T> = {
  items: T[]
}

export default function AreaManagement<T extends { id: string, value: string}> ({ 
    items 
}: Props<T>) {

    const handleDelete = () => {
      console.log('deleted an item')
    }

    return (
        <section className="pt-6 flex-1 flex flex-col space-y-6">
            <ManageTabs activeValue="areas" />
            <SelectableCrudView
                items={items}
                onDelete={handleDelete}
                containerStyle="stacked px-1"
                renderItem={(item) => {
                    return (
                    <article className="text-main">
                        <h3>{item.value}</h3>
                    </article>
                    )
                }}
            />
        </section>
    );
}