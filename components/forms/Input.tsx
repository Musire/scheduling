"use client";

import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { LabelTag } from "../typography";

type BaseProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  as?: "input" | "textarea";
};

type FormFieldProps<T extends FieldValues> = BaseProps<T> &
  InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Input<T extends FieldValues>({
  label,
  name,
  as = "input",
  type = "text",
  className = "",
  onKeyDown, // Extract onKeyDown from props if present
  ...props
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState: { errors } } = useFormContext<T>();

  const error = errors[name];
  const isHidden = type === "hidden";
  const isPassword = type === "password";
  const Tag = as;

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const baseClasses = `bg-background w-full border rounded-lg focus:ring-2 focus:outline-none transition-all
    ${error ? "border-error focus:ring-error" : "border-border focus:ring-border"}
    ${as === "textarea" ? "min-h-[128px] py-2 px-3" : "h-10 px-3"} 
    ${isPassword ? "pr-10" : ""} ${className}`;

  if (isHidden) return <input type="hidden" {...register(name)} />;

  return (
    <div className="flex flex-col space-y-1.5 w-full">
      {label && (
        <LabelTag htmlFor={name} className="w-fit text-sm font-medium text-else capitalize">
          {label}
        </LabelTag>
      )}

      <div className="relative">
        <Tag
          id={name}
          type={as === "input" ? inputType : undefined}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name, { valueAsNumber: type === "number" })}
          {...props}
          className={baseClasses}
          onWheel={(e) => type === "number" && e.currentTarget.blur()}
          onKeyDown={(e) => {
            // Block 'e', 'E', '-', and '+' for number inputs
            if (type === "number" && ["e", "E", "-", "+"].includes(e.key)) {
              e.preventDefault();
            }
            // Call any custom onKeyDown passed via props
            onKeyDown?.(e as any);
          }}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-else hover:text-else/70 transition-colors hover:cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      <div id={`${name}-error`} role="alert" className="min-h-5">
        {error && (
          <span className="text-xs text-error animate-in fade-in slide-in-from-top-1">
            {String(error.message)}
          </span>
        )}
      </div>
    </div>
  );
}
