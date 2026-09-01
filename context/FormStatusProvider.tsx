
import { createContext, ReactNode, useContext } from "react";

type StateType<T> = {
    success: false;
    data: null;
    error: string;
} | {
    success: false;
    data: null;
    error: null;
} | {
    success: true;
    data: T;
    error?: string | undefined;
}

type FormStatusContextType<T> = {
  state: StateType<T>;
  pending: boolean;
};

const FormStatusContext = createContext<FormStatusContextType<any> | undefined>(undefined);

type FormStatusProviderProps<T> = {
  state: StateType<T>;
  pending: boolean;
  children: ReactNode;
};

export function FormStatusProvider<T>({ state, pending, children }: FormStatusProviderProps<T>) {

  return (
    <FormStatusContext.Provider value={{ state, pending }}>
      {children}
    </FormStatusContext.Provider>
  );
}

export function useFormStatus<T>() {
  const context = useContext(FormStatusContext);
  if (!context) {
    throw new Error("useFormStatus must be used within FormStatusProvider");
  }
  return context as FormStatusContextType<T>;
}