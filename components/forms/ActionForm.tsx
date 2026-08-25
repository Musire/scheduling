'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { DefaultValues, FieldValues, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import StatusButton from "./StatusButton";

export type FormState = { success: boolean; error: string | null };

// 1. Enforce that S evaluates to standard FieldValues (Record<string, any>)
interface FormProps<S extends z.ZodObject<FieldValues>> {
    schema: S;
    // 2. Explicitly type initial values as RHF DefaultValues
    initialValues: DefaultValues<z.infer<S>>; 
    children?: React.ReactNode;
    actionFn: (prevState: FormState, formData: FormData) => FormState | Promise<FormState>;
    onSuccess?: () => void;
}

// 3. Apply the updated FieldValues constraint down to the component
export default function ActionForm<S extends z.ZodObject<FieldValues>>({ 
    initialValues, 
    schema,
    actionFn,
    onSuccess,
    children 
}: FormProps<S>) {
    
    const [state, formAction, pending] = useActionState(actionFn, { 
        success: false, 
        error: null
    });

    // TypeScript can now safely type-check this setup without any errors
    const form = useForm<z.infer<S>>({
      resolver: zodResolver(schema) as any, 
      defaultValues: initialValues,
      mode: "onBlur"
    });

    const handleFormSubmit = async (formData: FormData) => {
      const isValid = await form.trigger();

      if (!isValid) return;

      startTransition(async() => {
          formAction(formData);
      });
  };

    useEffect(() => {
        if (state.success && onSuccess) {
            onSuccess();
            form.reset();
        }
    }, [state.success, onSuccess, form]);

    return (
      <FormProvider {...form}>
        <form
          className="flex flex-col rounded-xl max-w-lg w-full p-6 stacked space-y-2"
          action={handleFormSubmit}
        >
          {children}
          {state.error && <p className="text-error text-sm">{state.error}</p>}
          <StatusButton isPending={pending} state={state} />
        </form>
      </FormProvider>
    );
}
