import RoleRenderer from "@/components/RoleRenderer";
import { getUsers } from "@/domains/users/queries/getUsers";
import UserMangement from "@/features/admin_manage/components/UserManagement";

export default async function UserMangementPage () {
    const { data } = await getUsers()

    if (!data) {
        return (
            <section className="">
                <p className="">not found</p>
            </section>
        )
    }

    return (
        <RoleRenderer 
            roles={{
                MANAGER: <UserMangement users={data} />   
            }}
        />
    );
}
