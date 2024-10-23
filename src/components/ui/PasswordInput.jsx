"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
export default function PasswordInput({
  name,
  type,
  placeholder,
  disabled,
  register,
  errors,
  label,
  customClass,
  labelClass,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEdge, setIsEdge] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const Edge = /Edg/.test(navigator.userAgent);
    setIsEdge(Edge);
  });

  return (
    <div className="flex flex-col gap-4 col-span-full">
      <label className={`text-grey-primary ${labelClass}`}>{label}</label>
      <div className="relative flex flex-col gap-1">
        {isEdge ? (
          <input
            type={type || "password"}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full rounded-lg border-2 border-grey-primary/10 focus:ring-1 ring-blue-primary p-4 ${customClass}`}
            {...register(name)}
          />
        ) : (
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full rounded-lg border-2 focus-visible:outline p-4 border-grey-primary/10 focus:ring-1 ring-blue-primary ${customClass}`}
            {...register(name)}
          />

        )}
        {!isEdge &&
         <button
            type="button"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <div className="text-web_light_gray">
                <Eye height={20} width={20}  className="text-grey-primary/30"/>
              </div>
            ) : (
              <div className="text-web_light_gray">
                <EyeOff height={20} width={20} className="text-grey-primary/30" />
              </div>
            )}
          </button>
        }
      </div>
      {errors && errors[name] && (
          <span className="ml-2 text-red-500 text-xs self-start">
            {errors[name].message}
          </span>
        )}
    </div>
  );
}
