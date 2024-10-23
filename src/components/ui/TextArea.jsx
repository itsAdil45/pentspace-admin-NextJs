import React from "react";

export default function TextArea({
  name,
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
      {label && (
        <label htmlFor={id} className={`text-grey-primary ${labelClass}`}>
          {label}
        </label>
      )}
      <div className="flex flex-col gap-1">
        <textarea
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg border-2 p-3 lg:p-4 border-grey-primary/10 focus-visible:right-1 ring-blue-primary  ${customClass ?? "min-h-[200px] max-h-[400px]"}`}
          {...(register && register(name))}
          onChange={onChange}
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
