import RoleRenderer from "@/components/RoleRenderer";
import CreateRoleForm from "@/domains/roles/components/CreateRoleForm";

export default function NewRolePage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <CreateRoleForm />
            }}
        />
    );
}