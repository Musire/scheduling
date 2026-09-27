'use client'

import { ActionForm, Input } from "@/components/forms";
import FormStepper from "@/components/forms/FormStepper";
import { useSidePanel } from "@/context/SidepanelProvider";
import { createUser } from "@/domains/users/user.actions";
import { UserCreationSchema } from "@/domains/users/user.validations";
import { useRouter } from "next/navigation";
import z from "zod";

export default function CreateUserForm () {
    const { clearModal: clearSidepanel } = useSidePanel()
    const router = useRouter()
    const defaultData = {
        name: '',
        email: '',
        payRate: 0,
        maxHours: 40

    }
    const onSuccess = () => {
        clearSidepanel()
    }

    const slides = [
        {
            schema: z.object({
                name: UserCreationSchema.shape.name,
                email: UserCreationSchema.shape.email
            }), 
            component: (
                <>
                    <Input 
                        label="employee name"
                        name="name"
                    />
                    <Input 
                        label="email address"
                        name="email"
                    />
                </>
            )
        },
        {
            schema: z.object({
                payRate: UserCreationSchema.shape.payRate
            }),
            component: (
                <>
                    <Input 
                        label="Pay Per Hour"
                        name="payRate"
                        type="number"
                    />
                    <Input 
                        label="Weekly Hours"
                        name="maxHours"
                        type="number"
                    />
                </>
            )
        }
    ]
    
    return (
        <section className="py-6 centered-col flex-1">
            <h2 className="text-xl">User Creation Form</h2>
            <ActionForm
                isMulti
                actionFn={createUser}
                schema={UserCreationSchema}
                initialValues={defaultData}
                onSuccess={onSuccess}
            >
                <FormStepper slides={slides} />
            </ActionForm>
        </section>
    );
}