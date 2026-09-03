import UpdateUserForm from "@/forms/UpdateUserForm";



export default async function EditUser ({ data }: Props) {

    return (
        <UpdateUserForm data={data} />
    );
}