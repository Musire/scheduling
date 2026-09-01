"use client"

import { DropdownButton } from "@/components/buttons"
import { ActionForm, ControlledInput, Input } from "@/components/forms"
import FormTimePicker from "@/components/forms/FormTimepicker"
import { ActionResult } from "@/domains/identity/types"
import { RequirementCreateSchema } from "@/domains/restaurant/validation/RequirementSchema"
import { getNow } from "@/lib/timeUtils"
import { useRouter } from "next/navigation"
import AreaRoleInput from "./AreaRoleInput"

type Props = {
  areaRoles: {
    id: string;
    name: string;
    roles: {
        id: string;
        name: string;
    }[]
  }[]
}

export default function CreateRequirementForm({
  areaRoles
}: Props) {
  const router = useRouter()

  const onSuccess = () => {
    console.log('successful')
  }

  const defaultData = {
    areaId: '',
    roleId: '',
    dayofWeek: 1,
    requiredUsers: 1,
    startAt: getNow(),
    endsAt: getNow()
  }

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  interface UserItem {
    id: string; // uuid
    name: string;
  }

  // Your list of objects from an API or constant
  const users: UserItem[] = [
    { id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890", name: "Alice Smith" },
    { id: "f1e2d3c4-b5a6-7890-dcba-9876543210ef", name: "Bob Jones" },
  ];

  const testAction = <T,>(prevState: ActionResult<T>, formData: FormData): ActionResult<T> => { 
    const rawEntries = Object.fromEntries(formData.entries());
    console.log('submitted: ', rawEntries)
    return { success: false, data: null, error: 'rest' }; 
  }

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else overflow-y-scroll scrollbar-adjust ">
      <h2 className="text-3xl text-main">Create Requirement</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={defaultData}
          actionFn={testAction}
          schema={RequirementCreateSchema}
          onSuccess={onSuccess}
        >
          <ControlledInput 
            name="dayofWeek"
            label="Day of the Week"
            render={(field) => {
              const currentLabel = field.value ? weekdays[field.value - 1] : "";
              return (
                <DropdownButton
                  options={weekdays}
                  value={currentLabel}
                  onChange={(selectedDay) => {
                    const index = weekdays.indexOf(selectedDay);
                    const numericValue = index !== -1 ? index + 1 : null;
                    field.onChange(numericValue);
                  }}
                /> 
              )
            }}
          />
          <AreaRoleInput areaRoles={areaRoles} />
          <Input
            label="Required" 
            name="requiredUsers"
            type="number"
          />
          <FormTimePicker 
            label="endsAt"
            name="endsAt"
          />
          <FormTimePicker 
            label="startAt"
            name="startAt"
          />
        </ActionForm>
      </div>
    </div>
  )
}


