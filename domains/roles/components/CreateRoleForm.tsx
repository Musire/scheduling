"use client"

import { ActionForm, Input } from "@/components/forms"
import { useSidePanel } from "@/context/SidepanelProvider"
import { createRole } from "@/domains/roles/role.actions"
import { RoleCreateSchema } from "@/domains/roles/role.validations"

type Props = {
  data?: {
    areaId: string
  }
}

export default function CreateRoleForm({ data }: Props) {
  const { clearModal: clearSidepanel } = useSidePanel()

  const onSuccess = () => {
    clearSidepanel()
  }

  
  if (!data) return;

  return (
    <div className=" bg-background xs:max-md:w-dvw xs:max-md:h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Create Role</h2>
      <div className="w-full rounded-xl">
        <ActionForm 
          initialValues={{ name: "", areaId: data.areaId }}
          actionFn={createRole}
          schema={RoleCreateSchema}
          onSuccess={onSuccess}
        >
          <Input
            label="role name" 
            name="name"
          />
          <Input 
            name="areaId"
            type="hidden"
          />
      </ActionForm>
      </div>
    </div>
  )
}


