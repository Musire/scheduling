"use client"

import { ActionForm, Input } from "@/components/forms"
import { updateArea } from "@/domains/areas/area.actions"
import { AreaUpdateSchema, UpdateAreaType } from "@/domains/areas/area.validation"
import { useRouter } from "next/navigation"

type Props = {
  data?: UpdateAreaType
}

export default function UpdateAreaForm({ data }: Props) {
  const router = useRouter()

  const defaultData = data ?? {
	  id: '',
	  name: ''
  }

  const onSuccess = () => {
    router.push('/manage/areas')
  }

  return (
    <div className=" bg-background flex-1 xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Update Area</h2>
      <div className="w-full rounded-xl">
        <ActionForm 
          initialValues={defaultData}
          actionFn={updateArea}
          schema={AreaUpdateSchema}
          onSuccess={onSuccess}
        >
            <Input
                label="name" 
                name="name"
            />
            <Input 
                name="id"
                type="hidden"
            />
      </ActionForm>
      </div>
    </div>
  )
}


