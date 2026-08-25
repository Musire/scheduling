import RoleRenderer from "@/components/RoleRenderer";
import UserMangement from "@/features/admin_manage/components/UserManagement";

export default async function UserMangementPage () {

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <UserMangement />   
            }}
        />
    );
}
