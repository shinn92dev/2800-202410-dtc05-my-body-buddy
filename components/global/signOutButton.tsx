"use client";

import { useClerk } from "@clerk/nextjs";
import { useForm, SubmitHandler } from "react-hook-form";

const routeLogOutPost = async (email) => {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("RESPONSE FROM BUTTON: ", response);
    if (!response.ok) {
      throw new Error("Not OK");
    }
    const data = await response.json();
    console.log("Server Response: ", data);
  } catch (error) {
    console.log(error);
  }
};

export default function SignOutButton() {
  const { signOut, user } = useClerk();
  const { handleSubmit } = useForm();
  const onSubmit = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      await signOut();
      console.log("SIGNOUTINFO FROM FORM ");
      await routeLogOutPost(email);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    // Clicking on this button will sign out a user
    // and reroute them to the "/" (home) page.
    <form onSubmit={handleSubmit(onSubmit)} method="post">
      <button
        className={`text-beige font-bold text-center py-2 px-4 rounded-full 
        m-2 bg-gray-500 hover:bg-gray-700`}
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
}
