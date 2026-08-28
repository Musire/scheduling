import RoleRenderer from "@/components/RoleRenderer";
import CreateRoleForm from "@/forms/CreateRoleForm";

export default function NewRolePage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <CreateRoleForm />
            }}
        />
    );
}