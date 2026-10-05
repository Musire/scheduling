'use client';

import { ActionForm, Input } from "@/components/forms";
import { createPassword } from "@/domains/invites/invite.actions";
import { PasswordCreationSchema } from "@/domains/invites/invite.validation";
import { convertParamToString } from "@/lib/manipulateParam";
import { useParams } from "next/navigation";

export default function AcceptingInvitePage () {
    const onSuccess = () => {}
    const { invitationId } = useParams()
    const cleanedId = convertParamToString(invitationId)

    return (
        <section className="bg-background w-dvw h-dvh overflow-hidden p-6 flex text-main">
            <div className="flex-1  centered-col">
                <h2 className="text-main text-xl font-medium pb-6">Create account password</h2>
                <ActionForm 
                    schema={PasswordCreationSchema}
                    initialValues={{
                        password: '',
                        password2: '',
                        invitationId: cleanedId ?? ''
                    }}
                    actionFn={createPassword}
                    onSuccess={onSuccess}
                >
                    <Input 
                        label="password"
                        name="password"
                    />
                    <Input 
                        label="confirm password"
                        name="password2"
                    />
                    <Input 
                        type="hidden"
                        name="invitationId"
                    />
                </ActionForm>
            </div>
        </section>
    );
}