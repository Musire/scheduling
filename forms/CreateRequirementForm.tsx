"use client"

import { DropdownButton } from "@/components/buttons"
import { ActionForm, ControlledInput, Input } from "@/components/forms"
import FormStepper from "@/components/forms/FormStepper"
import FormTimePicker from "@/components/forms/FormTimepicker"
import { useToast } from "@/context"
import { createRequirement } from "@/domains/requirements/actions/requirement.actions"
import { RequirementCreateSchema } from "@/domains/requirements/validation/RequirementSchema"
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
    dayOfWeek: 1,
    requiredUsers: 0,
    startsAt: getNow(),
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

  const slides = [
    {
      schema: z.object({
        dayofWeek: RequirementCreateSchema.shape.dayOfWeek,
        areaId: RequirementCreateSchema.shape.areaId,
        roleId: RequirementCreateSchema.shape.roleId,
      }),
      component: (
        <>
          <ControlledInput 
              name="dayOfWeek"
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
        startAt: RequirementCreateSchema.shape.startsAt,
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
            label="startsAt"
            name="startsAt"
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
          actionFn={createRequirement}
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


