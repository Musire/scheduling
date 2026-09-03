'use client';

import { ActionForm } from "@/components/forms";
import AreaRoleInput from "@/components/forms/inputs/AreaRoleInput";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import { useToast } from "@/context";
import { createShift } from "@/domains/scheduling/actions/shift.actions";
import { getSchedulingData } from "@/domains/scheduling/queries/getSchedulingData";
import { ShiftCreationSchema } from "@/domains/scheduling/validations/ShiftSchema";
import { useEffect, useState } from "react";

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
        userId: '',
        startsAt: '',
        endsAt: '',
    }

    const onSuccess = () => {

    }

    return (
        <ActionForm
            initialValues={defaultData} 
            schema={ShiftCreationSchema}
            actionFn={createShift}
            onSuccess={onSuccess}
        >
            <AreaRoleInput areaRoles={data?.areaRoles ?? []} />
            <FormDropdown
                name="scheduleId"
                label="scheduled week"
                options={data?.schedules ?? []}
                getOptionLabel={(item) => item.weekStart.toISOString()}  
                getOptionValue={(item) => item.id}    
            />
        </ActionForm>
    );
}