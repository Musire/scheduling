'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { DefaultValues, FieldValues, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import StatusButton from "./StatusButton";

export type FormState = { success: boolean; error: string | null };

interface FormProps<S extends z.ZodObject<FieldValues>> {
    schema: S;
    initialValues: DefaultValues<z.infer<S>>; 
    children?: React.ReactNode;
    actionFn: (prevState: FormState, formData: FormData) => FormState | Promise<FormState>;
    onSuccess?: () => void;
}

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

    const form = useForm<z.infer<S>>({
      resolver: zodResolver(schema) as any, 
      defaultValues: initialValues,
      mode: "onBlur"
    });

    const handleFormSubmit = async () => {
      const isValid = await form.trigger();
      if (!isValid) return;

      const formValues = form.getValues();

      // 1. Explicitly build the FormData instance from RHF values
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      startTransition(async () => {
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
