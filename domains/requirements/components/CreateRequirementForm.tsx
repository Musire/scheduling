"use client"

import { DropdownButton } from "@/components/buttons"
import { ActionForm, ControlledInput, Input } from "@/components/forms"
import FormStepper from "@/components/forms/FormStepper"
import FormTimePicker from "@/components/forms/inputs/FormTimepicker"
import { PanelProps } from "@/components/sidepanel/PanelRegistry"
import { useToast } from "@/context"
import { useSidePanel } from "@/context/SidepanelProvider"
import { getAreaRoles } from "@/domains/areas/area.queries"
import { createRequirement } from "@/domains/requirements/requirement.actions"
import { RequirementCreateSchema } from "@/domains/requirements/RequirementSchema"
import { useFetch } from "@/hooks/useFetch"
import { getNow } from "@/lib/timeUtils"
import { useEffect } from "react"
import z from "zod"
import AreaRoleInput from "../../../components/forms/inputs/AreaRoleInput"

export default function CreateRequirementForm({ data }: PanelProps) {
  const { clearModal } = useSidePanel()
  const { createSuccess } = useToast()
  const { data: areaRoles, execute } = useFetch(getAreaRoles)

  useEffect(() => {
    execute()
  }, [])

  const onSuccess = () => {
    createSuccess('created shift requirement')
    clearModal()
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
        // Fixed typo: dayOfWeek (capital O)
        dayOfWeek: RequirementCreateSchema.shape.dayOfWeek,
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
        // Fixed typo: startsAt (added 's')
        startsAt: RequirementCreateSchema.shape.startsAt,
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
    // Fixed: Replaced `w-dvw h-dvh` with fluid container bounds
    <section className="py-6 flex-1  centered-col text-else">
      <h2 className="text-3xl text-main mb-6">Create Requirement</h2>
      <div className=" rounded-xl w-full">
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
    </section>
  )
}