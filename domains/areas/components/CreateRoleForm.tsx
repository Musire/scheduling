"use client"

import { ActionForm, Input } from "@/components/forms"
import { createRole } from "@/domains/restaurant/actions/role.actions"
import { RoleCreateSchema } from "@/domains/restaurant/validation/RoleSchema"
import { useParams, useRouter } from "next/navigation"

export default function CreateRoleForm() {
  const router = useRouter()
  const { areaSlug } = useParams()

  const onSuccess = () => {
    router.push(`/manage/areas/${areaSlug}`)
  }

  const area = Array.isArray(areaSlug) 
    ? areaSlug[0] 
    : (areaSlug ?? "");

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Create Role</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={{ name: "", areaSlug: area }}
          actionFn={createRole}
          schema={RoleCreateSchema}
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


