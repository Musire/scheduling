import { ActionForm } from "@/components/forms";
import FormDropdown from "@/components/forms/inputs/FormDropdown";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { getWeekRange } from "@/lib/timeUtils";
import { createWeek } from "../week.actions";
import { WeekCreationSchema } from "../week.validations";

export default function CreateWeekForm () {
    const { createSuccess } = useToast()
    const { clearModal } = useSidePanel()

    const defaultData = {
        week: ''
    }
    const successHandler = () => {
        createSuccess('new schedule created successfully')
        clearModal()
    }
    return (
        <ActionForm 
            schema={WeekCreationSchema}
            onSuccess={successHandler}
            initialValues={defaultData}
            actionFn={createWeek}
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