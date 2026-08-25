"use client"

import Theme from "@/components/Theme"
import { ActionForm, Input } from "@/components/forms"
import { H2 } from "@/components/typography"
import { signup } from "@/domains/identity/actions/auth.actions"
import z from "zod"

export default function SignupPage() {

  const schema = z.object({
    email: z.email(),
    password: z.string().min(1, 'you need to send password'),
    fullName: z.string().min(1, 'you need fullname'),
    role: z.string().min(1, 'you need to select role')
  })

  return (
    <main className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <Theme />
      <H2 className="text-main">Signup Form</H2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={{ email: "", password: "", fullName: '', role: 'ENDUSER'}}
          actionFn={signup}
          schema={schema}
        >
          <Input 
            label="email"
            name="email"
          />
          <Input 
            label="full name"
            name="fullName"
          />
          <Input 
            label="password"
            name="password"
            type="password"
          />
        </ActionForm>
      </div>
    </main>
  )
}


