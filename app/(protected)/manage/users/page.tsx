import RoleRenderer from "@/components/RoleRenderer";
import UserMangement from "@/domains/users/components/UserManagement";
import { getUsers } from "@/domains/users/user.queries";

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
