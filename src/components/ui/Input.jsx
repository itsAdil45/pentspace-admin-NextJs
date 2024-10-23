import React from "react";

export default function Input({
    name,
    type,
    placeholder,
    disabled,
    register,
    errors,
    label,
    customClass,
    labelClass,
    id,
    value,
    onChange
  }) {
    return (
      <div className="flex flex-col gap-4 col-span-full">
        {
          label &&
        <label className={`text-grey-primary ${labelClass}`}>
            {label}
        </label>
        }
        <div className="flex flex-col gap-1">
        <input id={id} type={type} name={name} value={value} placeholder={placeholder} disabled={disabled} className={`w-full rounded-lg border-2 p-2  border-grey-primary/10 focus-visible:right-1  ring-blue-primary ${customClass}`}
        {...register&&register(name)}
        {...(onChange && { onChange })}
        />
        {errors && errors[name] && (
          <span className="ml-2 text-red-500 text-xs self-start">
            {errors[name].message}
          </span>
        )}
        </div>
      </div>
    );
  }