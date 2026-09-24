"use client"

import { DropdownButton } from "@/components/buttons"
import { ActionForm, ControlledInput, Input } from "@/components/forms"
import FormStepper from "@/components/forms/FormStepper"
import FormTimePicker from "@/components/forms/inputs/FormTimepicker"
import { PanelProps } from "@/components/sidepanel/PanelRegistry"
import { useToast } from "@/context"
import { getAreaRoles } from "@/domains/areas/area.queries"
import { updateRequirement } from "@/domains/requirements/requirement.actions"
import { RequirementUpdateSchema } from "@/domains/requirements/RequirementSchema"
import { useFetch } from "@/hooks/useFetch"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import z from "zod"
import AreaRoleInput from "../../../components/forms/inputs/AreaRoleInput"



export default function UpdateRequirementForm({
  data,
}: PanelProps) {

  const router = useRouter()
  const { createSuccess } = useToast()
  const { data: areaRoles, error, execute} = useFetch(getAreaRoles)

  useEffect(() => {
    execute()
  }, [])


  const onSuccess = () => {
    router.push('/manage/requirements')
    createSuccess('updated shift requirement')
  }

  const defaultData = data ?? {
    id: '',
    areaId: '',
    roleId: '',
    dayOfWeek: '',
    requiredUsers: '',
    startsAt: '',
    endsAt: ''
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
        dayOfWeek: RequirementUpdateSchema.shape.dayOfWeek,
        areaId: RequirementUpdateSchema.shape.areaId,
        roleId: RequirementUpdateSchema.shape.roleId,
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
            <AreaRoleInput areaRoles={areaRoles ?? []} />
        </>
      )
    },
    {
      schema: z.object({
        requiredUsers: RequirementUpdateSchema.shape.requiredUsers,
        endsAt: RequirementUpdateSchema.shape.endsAt,
        startsAt: RequirementUpdateSchema.shape.startsAt,
      }),
      component: (
        <>
          <Input
            label="Required" 
            name="requiredUsers"
            type="number"
          />
          <FormTimePicker 
            label="startsAt"
            name="startsAt"
          />
          <FormTimePicker 
            label="endsAt"
            name="endsAt"
          />
          <Input 
            name="id"
            type="hidden"
          />
        </>
      )
    }
  ]

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else overflow-y-scroll scrollbar-adjust ">
      <h2 className="text-3xl text-main">Update Requirement</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={defaultData}
          actionFn={updateRequirement}
          schema={RequirementUpdateSchema}
          onSuccess={onSuccess}
          isMulti
        >
          <FormStepper slides={slides} />
        </ActionForm>
      </div>
    </div>
  )
}


