import UpdateUserForm from "@/domains/users/components/UpdateUserForm";



export default async function EditUser ({ data }: Props) {

    return (
        <UpdateUserForm data={data} />
    );
}