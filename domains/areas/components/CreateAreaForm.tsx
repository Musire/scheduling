"use client"

import { ActionForm, Input } from "@/components/forms"
import { createArea } from "@/domains/areas/area.actions"
import { AreaCreateSchema } from "@/domains/areas/area.validation"
import { useRouter } from "next/navigation"

export default function CreateAreaForm() {
  const router = useRouter()

  const onSuccess = () => {
    router.push('/manage/areas')
  }

  return (
    <section className="py-6  centered-col  flex-1 text-else">
      <h2 className="text-3xl text-main mb-6">Create Area</h2>
      <div className="rounded-xl w-full">
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
    </section>
  )
}