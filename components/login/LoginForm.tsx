"use client";

import React, { useEffect, useState } from "react";
import SignUpAndInIcon from "@/components/global/icons/SignUpAndInIcon";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn } from "@clerk/nextjs";
import axios from "axios";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

const routeLoginPostUser = async (userData: any) => {
  try {
    const newUserData = {
      email: userData.email,
      username: userData.username,
      isLoggedIn: true,
    };
    const response = await axios.post("/api/login", newUserData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status !== 200) {
      throw new Error("Not OK");
    }
    window.location.href = "/summary/diet";

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

type userLoginInput = {
  email: string;
  password: string;
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { signIn } = useSignIn();
  const [loginErrors, setLoginErrors] = React.useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userLoginInput>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<
      userLoginInput,
      any
    >,
  });

  useEffect(() => {
    // Setting loading to false once the component mounts
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const onSubmit: SubmitHandler<userLoginInput> = async (
    data: userLoginInput
  ) => {
    try {
      const logInResult = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });

      setLoginErrors(undefined); // clear previous errors

      if (logInResult?.status === "complete") {
        await routeLoginPostUser(data);
      } else {
        console.error("Login Incomplete: ", logInResult);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const errorMessages = err.errors
          .map((error) => error.longMessage)
          .join("\n");

        setLoginErrors(errorMessages);
        console.error(JSON.stringify(err, null, 2));
      } else {
        console.error("Error: ", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="mt-8 flex flex-row justify-center">
        Page is loading... 
        <svg
          className="ml-1 animate-spin h-5 w-5 mr-3 text-logo-pumpkin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <form
        className="mx-auto max-w-xs"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <div className="mt-4">
          <label htmlFor="email" className="hidden">
            Email
          </label>
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="hidden">
            Password
          </label>
          <input
            className="w-full px-8 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          className="mt-4 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>Submit</span>
            </>
          ) : (
            <>
              <SignUpAndInIcon width={6} />
              <span className="ml-3">Submit</span>
            </>
          )}
        </button>
      </form>

      {loginErrors && (
        <div className="mt-4 text-red-500 text-sm">
          {loginErrors.split("\n").map((message, index) => (
            <p key={index}>
              {message}
              <br />
              Please check your email and password again.
            </p>
          ))}
        </div>
      )}
    </>
  );
}
