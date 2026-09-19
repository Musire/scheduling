'use client';

import { ActionForm } from "@/components/forms";
import FormStepper from "@/components/forms/FormStepper";
import AreaRoleInput from "@/components/forms/inputs/AreaRoleInput";
import FormDatePicker from "@/components/forms/inputs/FormDatepicker";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import FormTimePicker from "@/components/forms/inputs/FormTimepicker";
import { useToast } from "@/context";
import { createShift } from "@/domains/scheduling/actions/shift.actions";
import { getSchedulingData } from "@/domains/scheduling/queries/getSchedulingData";
import { ShiftCreationSchema } from "@/domains/scheduling/validations/ShiftSchema";
import { useEffect, useState } from "react";
import z from "zod";

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
    const [data, setData] = useState<SchedulingData | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const { createError} = useToast()

    useEffect(() => {
        async function loadData () {
            const res = await getSchedulingData()
            if (!res.success && res.error) {
                createError(res.error)
                return;
            }
            if (res.data) {
                setData(res.data)
            }
        }
        loadData()
        setLoading(false)
    },[])

    if (isLoading) {
        return <p className="">...loading</p>
    }

    const defaultData = {
        scheduleId: '',
        areaId: '',
        roleId: '',
        shiftDate: new Date(),
        userId: '',
        startsAt: '',
        endsAt: '',
    }

    const onSuccess = () => {

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
                        options={data?.schedules ?? []}
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
                <AreaRoleInput areaRoles={data?.areaRoles ?? []} />
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
                        options={data?.users ?? []}
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
        <ActionForm
            initialValues={defaultData} 
            schema={ShiftCreationSchema}
            actionFn={createShift}
            onSuccess={onSuccess}
            isMulti
        >
            <FormStepper slides={slides} />
        </ActionForm>
    );
}