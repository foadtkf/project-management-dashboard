"use client";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
interface Iinput {
  type?: string;
  name: string;
  size?: "large" | "small";
  value?: string | string[];
  id?: string;
  placeholder?: string;
  validate?: object;
  label?: string;
  errorMessage?: string;
}
const FormInput = ({
  type,
  name,
  size,
  value,
  id,
  placeholder,
  validate,
  label,
  errorMessage,
}: Iinput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              autoComplete="off"
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              autoComplete="off"
              {...field}
              type={type}
              size={size}
              value={value ? value : field.value}
              placeholder={placeholder}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
