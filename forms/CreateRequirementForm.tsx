"use client"

import { DropdownButton } from "@/components/buttons"
import { ActionForm, ControlledInput, Input } from "@/components/forms"
import FormStepper from "@/components/forms/FormStepper"
import FormTimePicker from "@/components/forms/FormTimepicker"
import { useToast } from "@/context"
import { ActionResult } from "@/domains/identity/types"
import { RequirementCreateSchema } from "@/domains/restaurant/validation/RequirementSchema"
import { getNow } from "@/lib/timeUtils"
import { useRouter } from "next/navigation"
import z from "zod"
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
  const { createSuccess } = useToast()

  const onSuccess = () => {
    router.push('/manage/requirements')
    createSuccess('created shift requirement')
  }

  const defaultData = {
    areaId: '',
    roleId: '',
    dayofWeek: 1,
    requiredUsers: 0,
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

  const testAction = <T,>(prevState: ActionResult<T>, formData: FormData): ActionResult<T> => { 
    const rawEntries = Object.fromEntries(formData.entries());
    console.log('submitted: ', rawEntries)
    return { success: true, data: { id: 'madeupid1234' } as unknown as T, error: undefined }; 
  }

  const slides = [
    {
      schema: z.object({
        dayofWeek: RequirementCreateSchema.shape.dayofWeek,
        areaId: RequirementCreateSchema.shape.areaId,
        roleId: RequirementCreateSchema.shape.roleId,
      }),
      component: (
        <>
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
        </>
      )
    },
    {
      schema: z.object({
        requiredUsers: RequirementCreateSchema.shape.requiredUsers,
        endsAt: RequirementCreateSchema.shape.endsAt,
        startAt: RequirementCreateSchema.shape.startAt,
      }),
      component: (
        <>
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
        </>
      )
    }
  ]

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else overflow-y-scroll scrollbar-adjust ">
      <h2 className="text-3xl text-main">Create Requirement</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={defaultData}
          actionFn={testAction}
          schema={RequirementCreateSchema}
          onSuccess={onSuccess}
          isMulti
        >
          <FormStepper slides={slides} />
        </ActionForm>
      </div>
    </div>
  )
}


