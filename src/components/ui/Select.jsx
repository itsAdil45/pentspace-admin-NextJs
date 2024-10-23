import React, { Children } from "react";

export default function Select({
    name,
    options,
    disabled,
    register,
    errors,
    label,
    customClass,
    labelClass,
    id,
    children
  }) {
    return (
      <div className="flex flex-col gap-4 col-span-full">
        {
          label &&
        <label className={`text-grey-primary ${labelClass}`}>
            {label}
        </label>
        }
        <div className="flex flex-col gap-1 rounded-lg border-2 p-2  border-grey-primary/10 focus-visible:ring-1  ring-blue-primary">
          <select id={id} name={name} disabled={disabled} className={`w-full outline-none  ${customClass}`} {...register && register(name)}>
            {/* {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))} */}
            {children}
          </select>
        </div>
          {errors && errors[name] && (
            <span className="ml-2 text-red-500 text-xs self-start">
              {errors[name].message}
            </span>
          )}
      </div>
    );
  }