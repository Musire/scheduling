'use client';

import { ActionForm } from "@/components/forms";
import FormStepper from "@/components/forms/FormStepper";
import AreaRoleInput from "@/components/forms/inputs/AreaRoleInput";
import FormDatePicker from "@/components/forms/inputs/FormDatepicker";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import FormTimePicker from "@/components/forms/inputs/FormTimepicker";
import { ScheduleSyncListener } from "@/components/forms/inputs/ScheduleSyncListener";
import { getSchedulingData } from "@/domains/weeks/week.queries";
import { useFetch } from "@/hooks/useFetch";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";
import z from "zod";
import { createShift } from "../shift.actions";
import { ShiftCreationSchema } from "../shift.validations.ts";


export default function CreateShiftForm () {
    const { data: schedulingData, isPending, execute } = useFetch(getSchedulingData)

    useEffect(() => {
        execute()
    },[execute])

    if (isPending) {
        return (
            <section className="w-full h-full centered">
                <RotateCw className="animate-spin" />
            </section>
        )
    }

    const defaultData = {
        scheduleId: '',
        areaId: '',
        roleId: '',
        shiftDate: new Date(),
        userId: '',
        startsAt: 0,
        endsAt: 0,
    }

    const onSuccess = () => {
        window.location.reload() 
    }

    const slides = [
        {
            schema: z.object({
                shiftDate: ShiftCreationSchema.shape.shiftDate,
            }).superRefine((data, ctx) => {
                if (!data.shiftDate) return;

                const shiftDate = new Date(data.shiftDate);

                const scheduleExists = schedulingData?.schedules.some((schedule) => {
                const weekStart = new Date(schedule.weekStart);
                const weekEnd = new Date(weekStart);

                weekEnd.setDate(weekEnd.getDate() + 7);

                return shiftDate >= weekStart && shiftDate < weekEnd;
                });

                if (!scheduleExists) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['shiftDate'],
                        message: 'Selected date does not fall within an active schedule week.',
                    });
                }
            }),
            component: (
                <>
                    <ScheduleSyncListener schedules={schedulingData?.schedules ?? []} />
                    <FormDatePicker 
                        name="shiftDate"
                        label="Pick Date"
                    />
                </>
            )
        },
        {
            schema: z.object({
                areaId: ShiftCreationSchema.shape.areaId,
                roleId: ShiftCreationSchema.shape.roleId,
            }),
            component: (
            <>
                <AreaRoleInput areaRoles={schedulingData?.areaRoles ?? []} />
            </>
            )
        },
        
        {
            schema: z.object({
                userId: ShiftCreationSchema.shape.userId,
                startsAt: ShiftCreationSchema.shape.startsAt,
                endsAt: ShiftCreationSchema.shape.endsAt,
            }),
            component: (
                <>
                    <FormDropdown
                        name="userId"
                        label="select employee"
                        options={schedulingData?.users ?? []}
                        getOptionLabel={(item) => item.name}  
                        getOptionValue={(item) => item.id}    
                    />
                    <FormTimePicker 
                        name="startsAt"
                        label="start time"
                    />
                    <FormTimePicker 
                        name="endsAt"
                        label="end time"
                    />
                </>
            )
        },
        
    ]

    return (
        <div className="flex-1 centered">
            <ActionForm
                initialValues={defaultData} 
                schema={ShiftCreationSchema}
                actionFn={createShift}
                onSuccess={onSuccess}
                isMulti
            >
                <FormStepper slides={slides} />
            </ActionForm>
        </div>
        
    );
}