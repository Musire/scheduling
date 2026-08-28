"use client"

import { ActionForm, Input } from "@/components/forms"
import { createArea } from "@/domains/restaurant/actions/area.actions"
import { AreaCreateSchema } from "@/domains/restaurant/validation/AreaSchema"
import { useRouter } from "next/navigation"

export default function CreateAreaForm() {
  const router = useRouter()

  const onSuccess = () => {
    router.push('/manage/areas')
  }

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Create Area</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={{ name: "" }}
          actionFn={createArea}
          schema={AreaCreateSchema}
          onSuccess={onSuccess}
        >
          <Input
            label="name" 
            name="name"
          />
      </ActionForm>
      </div>
    </div>
  )
}


