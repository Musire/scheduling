'use client';

import { ActionForm } from "@/components/forms";
import FormStepper from "@/components/forms/FormStepper";
import AreaRoleInput from "@/components/forms/inputs/AreaRoleInput";
import FormDatePicker from "@/components/forms/inputs/FormDatepicker";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import FormTimePicker from "@/components/forms/inputs/FormTimepicker";
import { useSidePanel } from "@/context/SidepanelProvider";
import { getSchedulingData } from "@/domains/weeks/week.queries";
import { useFetch } from "@/hooks/useFetch";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";
import z from "zod";
import { createShift } from "../shift.actions";
import { ShiftCreationSchema } from "../shift.validations.ts";

type SchedulingData = {
    schedules: {
        id: string;
        weekStart: Date;
    }[],
    areaRoles: {
        id: string;
        name: string;
        roles: {
            id: string;
            name: string;
        }[]
    }[],
    users: {
        id: string;
        name: string;
    }[]
}

export default function CreateShiftForm () {
    const { data: schedulingData, error, isPending, execute } = useFetch(getSchedulingData)
    const { clearModal } = useSidePanel()

    useEffect(() => {
        execute()
    },[])

    if (isPending) {
        return (
            <section className="w-full h-full centered">
                <RotateCw className="animate-spin" />
            </section>
        )
    }

    const defaultData = {
        scheduleId: schedulingData?.schedules[0]?.id ?? '',
        areaId: '',
        roleId: '',
        shiftDate: new Date(),
        userId: '',
        startsAt: '',
        endsAt: '',
    }

    const onSuccess = () => {
        clearModal()
    }

    const slides = [
        {
            schema: z.object({
                dayofWeek: ShiftCreationSchema.shape.scheduleId,
                shiftDate: ShiftCreationSchema.shape.shiftDate
            }),
            component: (
                <> 
                    <FormDropdown
                        name="scheduleId"
                        label="scheduled week"
                        options={schedulingData?.schedules ?? []}
                        getOptionLabel={(item) => item.weekStart.toLocaleDateString()}  
                        getOptionValue={(item) => item.id}    
                    />
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