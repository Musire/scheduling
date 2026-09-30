import { getUsers } from "../user.queries";
import UserMangement from "./UserManagement";

export default async function UserDataLayer () {
    const { data: users } = await getUsers()

    if (!users) {
        return (
            <section className="centered flex-1 text-muted-foreground p-6">
                <p>No employee data found for this week.</p>
            </section>
        );
    }

    return (
        <UserMangement users={users} />
    );
}