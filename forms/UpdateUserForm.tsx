'use client'

import { ActionForm, Input } from "@/components/forms";
import { createUser } from "@/domains/users/actions/user.actions";
import { UserUpdateSchema } from "@/domains/users/validations/UserSchema";
import { ModifiedUser } from "@/features/admin_manage/components/users/UserDetails";
import { useRouter } from "next/navigation";

type Props = {
  data: ModifiedUser
}

export default function UpdateUserForm ({ data }: Props) {
    const router = useRouter()
    const defaultData = {
        id: data.id,
        name: data.name,
        email: data.email,
        payRate: data.payRate

    }
    const onSuccess = () => {
        router.push('/manage/users')
    }
    
    return (
        <section className="py-6 centered-col flex-1">
            <h2 className="text-xl">Update User</h2>
            <ActionForm
                actionFn={createUser}
                schema={UserUpdateSchema}
                initialValues={defaultData}
                onSuccess={onSuccess}
            >
                <Input 
                    label="email address"
                    name="email"
                />
                <Input 
                    label="employee name"
                    name="name"
                />
                <Input 
                    label="Pay Rate"
                    name="payRate"
                    type="number"
                />
                <Input 
                    name="id"
                    type="hidden"
                />
            </ActionForm>
        </section>
    );
}