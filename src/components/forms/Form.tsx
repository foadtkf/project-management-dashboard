"use client";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

type FormConfig = {
  defaultValues?: Record<string, any>;
};
type FormProps = {
  children?: React.ReactElement | React.ReactNode;
  submitHandler: SubmitHandler<any>;
} & FormConfig;
export default function Form({
  children,
  submitHandler,
  defaultValues,
}: FormProps) {
  const formConfig: FormConfig = {};
  if (!!defaultValues) formConfig.defaultValues = defaultValues;
  const methods = useForm<FormProps>(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data: any) => {
    submitHandler(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
