'use client'

import { ActionForm, Input } from "@/components/forms";
import FormStepper from "@/components/forms/FormStepper";
import { useToast } from "@/context";
import { useSidePanel } from "@/context/SidepanelProvider";
import { updateUser } from "@/domains/users/user.actions";
import { UserUpdateSchema } from "@/domains/users/user.validations";
import z from "zod";
import { ExpectedUser } from "../user.types";

type Props = {
  data?: ExpectedUser
}

export default function UpdateUserForm ({ data }: Props) {
    const { clearModal: clearSidepanel } = useSidePanel()
    const { createSuccess } = useToast()

    const defaultData = {
        id: '',
        name: '',
        email: '',
        payRate: 0
    }
    
    const onSuccess = () => {
        clearSidepanel()
        createSuccess('successfully updated a user')
    }

    const slides = [
            {
                schema: z.object({
                    name: UserUpdateSchema.shape.name,
                    email: UserUpdateSchema.shape.email
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
                    payRate: UserUpdateSchema.shape.payRate
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
            <h2 className="text-xl">Update User</h2>
            <ActionForm
                isMulti
                actionFn={updateUser}
                schema={UserUpdateSchema}
                initialValues={data ?? defaultData}
                onSuccess={onSuccess}
            >
                <FormStepper slides={slides} />
                <Input 
                    name="id"
                    type="hidden"
                />
            </ActionForm>
        </section>
    );
}