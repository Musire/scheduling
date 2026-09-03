import RoleRenderer from "@/components/RoleRenderer";
import { getUserBySlug } from "@/domains/users/queries/getUsers";
import EditUser from "@/features/admin_manage/components/users/EditUser";

type Props = {
  params: Promise<{userSlug: string}>
}

export default async function EditUserPage ({ params }: Props) {
    const { userSlug } = await params
    const { data } = await getUserBySlug(decodeURIComponent(userSlug))
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
                MANAGER: <EditUser data={data} />
            }}
        />
    );
}