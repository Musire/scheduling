"use client"

import { ActionForm, Input } from "@/components/forms"
import Theme from "@/components/Theme"
import { login } from "@/domains/identity/actions/auth.actions"
import { useRouter } from "next/navigation"
import z from "zod"

export default function LoginPage() {
  const router = useRouter()

  const schema = z.object({
    email: z.email({ message: "Invalid email address" }), 
    password: z.string().min(1, "Password is required"),
  });

  const onSuccess = () => {
    router.push('/schedule')
  }

  return (
    <div className=" bg-background w-dvw h-dvh xs:px-6 centered-col space-y-6 py-6 text-else">
      <Theme />
      <h2 className="text-3xl text-main">Login Form</h2>
      <div className="surface-1 rounded-xl">
        <ActionForm 
          initialValues={{ email: "", password: ""}}
          actionFn={login}
          schema={schema}
          onSuccess={onSuccess}
        >
          <Input
            label="email" 
            name="email"
          />
          <Input
            label="password" 
            name="password"
            type="password"
          />
      </ActionForm>
      </div>
    </div>
  )
}


