import { ActionForm } from "@/components/forms";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { createSchedule } from "@/domains/scheduling/actions/schedule.actions";
import { ScheduleCreationSchema } from "@/domains/scheduling/validations/ScheduleSchema";
import { getWeekRange } from "@/lib/timeUtils";

export default function CreateScheduleForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()

    const defaultData = {
        weekStart: ''
    }
    const successHandler = () => {
        createSuccess('new schedule created successfully')
        clearModal()
    }
    return (
        <ActionForm 
            schema={ScheduleCreationSchema}
            onSuccess={successHandler}
            initialValues={defaultData}
            actionFn={createSchedule}
        >
            <FormDropdown 
                label='Select Week'
                name='weekStart'
                options={getWeekRange()}
                getOptionLabel={i => i}
                getOptionValue={i => new Date(i).toISOString()}
            />
        </ActionForm>
    );
}