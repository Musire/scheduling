import RoleRenderer from "@/components/RoleRenderer";
import CreateRoleForm from "@/domains/areas/components/CreateRoleForm";

export default function NewRolePage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <CreateRoleForm />
            }}
        />
    );
}