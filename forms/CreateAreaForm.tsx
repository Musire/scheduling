"use client"

import { ActionForm, Input } from "@/components/forms"
import { createArea, updateArea } from "@/domains/restaurant/actions/area.actions"
import { AreaCreateSchema, AreaUpdateSchema, UpdateAreaType } from "@/domains/restaurant/validation/AreaSchema"
import { useRouter } from "next/navigation"

type Props = {
  data?: UpdateAreaType | null;
  isUpdate?: boolean;
}

export default function CreateAreaForm({ data, isUpdate=false }: Props) {
  const router = useRouter()

  const onSuccess = () => {
    router.push('/manage/areas')
  }

  const initialValues = data ?? { name: "" }
  const schema = isUpdate ? AreaUpdateSchema :  AreaCreateSchema

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Create Area</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={initialValues}
          actionFn={isUpdate ? updateArea : createArea}
          schema={schema}
          onSuccess={onSuccess}
        >
          <Input
            label="name" 
            name="name"
          />
          {isUpdate && (
            <Input 
              name="id"
              type="hidden"
            />
          )}
      </ActionForm>
      </div>
    </div>
  )
}


