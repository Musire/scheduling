'use client';

import { ActionForm, Input } from "@/components/forms";
import { validateEmail } from "@/domains/invites/invite.actions";
import { EmailValildationSchema } from "@/domains/invites/invite.validation";

export default function InvitationValidationPage () {

    const onSuccess = () => {
        console.log('successful validation')
    }

    return (
        <section className="bg-background text-main w-dvw h-dvh overflow-hidden p-6 centered-col">
            <div className="">
                <h2 className="">validate your invite</h2>
                <ActionForm
                    initialValues={{ email: ''}}
                    schema={EmailValildationSchema}
                    actionFn={validateEmail}
                    onSuccess={onSuccess}
                >
                    <Input 
                        label="email"
                        name="email"
                    />
                </ActionForm>
            </div>
        </section>
    );
}