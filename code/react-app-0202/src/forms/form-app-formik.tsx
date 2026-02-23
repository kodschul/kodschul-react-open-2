import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const FormApp = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with values:", formik.values);
  };

  return (
    <div className="w-screen flex-1 flex items-center justify-center h-screen bg-green-100 text-black">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <div className="sm:col-span-4">
          <label
            htmlFor=""
            className="block text-sm/6 font-medium text-gray-900"
          >
            Username
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                name="username"
                type="text"
                value={formik.values.username}
                onChange={formik.handleChange}
                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>

          {formik.errors.username && (
            <label
              htmlFor=""
              className="block text-sm/6 font-medium text-red-700"
            >
              {formik.errors.username}
            </label>
          )}
        </div>

        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>

          {formik.errors.password && (
            <label
              htmlFor=""
              className="block text-sm/6 font-medium text-red-700"
            >
              {formik.errors.password}
            </label>
          )}
        </div>

        <div className="sm:col-span-4">
          <label className="block text-sm/6 font-medium text-gray-900">
            E-Mail
          </label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
              <input
                name="email"
                type="text"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
              />
            </div>
          </div>

          {formik.errors.email && (
            <label
              htmlFor=""
              className="block text-sm/6 font-medium text-red-700"
            >
              {formik.errors.email}
            </label>
          )}
        </div>

        <button
          disabled={!formik.isValid}
          type="submit"
          className="disabled:bg-slate-500 disabled:text-gray-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormApp;
