'use client'

import SelectableCrudView from "@/features/selectable_crud/components/selectable-crud-view/components/SelectableCrudView";

type Props<T> = {
  items: T[]
}

export default function TestComponent<T extends { id: string, value: string }> ({
  items
}: Props<T>) {
    const handleDelete = () => {
      console.log('deleted an item')
    }
    return (
        <section className=" w-dvw h-dvh flex">
          <SelectableCrudView 
            items={items}
            onDelete={handleDelete}
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