import RoleRenderer from "@/components/RoleRenderer";
import AdminManage from "@/features/admin_manage/components/AdminManage";

export default async function ManageLandingPage () {

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AdminManage />   
            }}
        />
    );
}
