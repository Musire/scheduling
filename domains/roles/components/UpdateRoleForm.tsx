"use client"

import { ActionForm, Input } from "@/components/forms"
import { createRole, updateRole } from "@/domains/roles/role.actions"
import { RoleCreateSchema, RoleUpdateSchema, RoleUpdateType } from "@/domains/roles/role.validations"
import { convertParamToString } from "@/lib/manipulateParam"
import { useParams, useRouter } from "next/navigation"

type Props = {
  data?: RoleUpdateType
}

export default function CreateRoleForm({ data }: Props) {
  const router = useRouter()
  const { areaSlug } = useParams()

  const onSuccess = () => {
    router.push(`/manage/areas/${areaSlug}`)
  }

  const area = convertParamToString(areaSlug)

  const defaultData = data ?? { name: "", areaSlug: area, id: "" }

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Update Role</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={defaultData}
          actionFn={updateRole}
          schema={RoleUpdateSchema  }
          onSuccess={onSuccess}
        >
          <Input
            label="role name" 
            name="name"
          />
          <Input 
            name="areaSlug"
            type="hidden"
          />
      </ActionForm>
      </div>
    </div>
  )
}


