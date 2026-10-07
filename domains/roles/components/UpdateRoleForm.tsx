"use client"

import { ActionForm, Input } from "@/components/forms"
import { useSidePanel } from "@/context/SidepanelProvider"
import { updateRole } from "@/domains/roles/role.actions"
import { RoleUpdateSchema, RoleUpdateType } from "@/domains/roles/role.validations"

type Props = {
  data?: RoleUpdateType
}

export default function CreateRoleForm({ data }: Props) {
  const { clearModal: clearSidepanel } = useSidePanel()

  const onSuccess = () => {
    clearSidepanel()
  }

  if (!data) return;

  return (
    <div className=" bg-background xs:max-md:w-dvw xs:max-md:h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <h2 className="text-3xl text-main">Update Role</h2>
      <div className="w-full rounded-xl">
        <ActionForm 
          initialValues={data}
          actionFn={updateRole}
          schema={RoleUpdateSchema  }
          onSuccess={onSuccess}
        >
          <Input
            label="role name" 
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


