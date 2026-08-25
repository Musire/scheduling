import RoleRenderer from "@/components/RoleRenderer";
import AdminAccount from "@/domains/account/components/AdminAccount";

export default function AccountPage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AdminAccount  />  
            }}
        />
    );
}