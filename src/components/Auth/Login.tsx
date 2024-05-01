"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { Button } from "antd";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";

interface IFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [emailerror, setEmailError] = useState(undefined);
  const [passworderror, setPasswordError] = useState(undefined);
  const onSubmit: SubmitHandler<IFormInputs> = async (data: any) => {
    axios
      .post("/api/auth/login", data)
      .then((res) => {
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          if (response.errors.email) setEmailError(response.errors.email);
          if (response.errors.password)
            setPasswordError(response.errors.password);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1 className="text_24px pb-[15px]">Login</h1>
      <Form submitHandler={onSubmit}>
        <div>
          <FormInput
            name="email"
            label="Email"
            size="large"
            errorMessage={emailerror}
          />
        </div>
        <div className="py-[15px]">
          <FormInput
            name="password"
            label="Password"
            size="large"
            type="password"
            errorMessage={passworderror}
          />
        </div>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
