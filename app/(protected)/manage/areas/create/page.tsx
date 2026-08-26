import RoleRenderer from "@/components/RoleRenderer";
import { CreateAreaForm } from "@/forms";

export default function CreateAreaPage () {
    return (
        <RoleRenderer
            roles={{
                MANAGER: <CreateAreaForm />
            }}
        /> 
    );
}