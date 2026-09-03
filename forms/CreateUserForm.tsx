'use client'

import { ActionForm, Input } from "@/components/forms";
import { createUser } from "@/domains/users/actions/user.actions";
import { UserCreationSchema } from "@/domains/users/validations/UserSchema";
import { useRouter } from "next/navigation";

export default function CreateUserForm () {
    const router = useRouter()
    const defaultData = {
        name: '',
        email: '',
        payRate: 0

    }
    const onSuccess = () => {
        router.push('/manage/users')
    }
    
    return (
        <section className="py-6 centered-col flex-1">
            <h2 className="text-xl">User Creation Form</h2>
            <ActionForm
                actionFn={createUser}
                schema={UserCreationSchema}
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
            </ActionForm>
        </section>
    );
}