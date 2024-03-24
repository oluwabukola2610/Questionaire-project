"use client"
import React, { useState } from "react";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useRegisterTokenMutation } from "@/services/authService";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const { replace } = useRouter();
  const [registerToken, { isLoading }] = useRegisterTokenMutation();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerToken({ email: email })
      .unwrap()
      .then(() => {
        replace("/questions");
      })
      .catch((err) => {
        message.error(err?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md w-full px-4 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to Registration</h2>
        <p className="mb-4 text-center">
          Kindly provide your email to get started with Question Time.
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md py-2 px-4"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
