import Logo from "./Logo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import axios from "axios";

// import slices

import { changeroute } from "../rtk/slices/RouteSlice";
import { changeaccount } from "../rtk/slices/AccountSlice";
import CrudApi from "../utils/CrudClass";
const Crud = new CrudApi("http://localhost:8000/api/v1", "/auth/login");

export default function Login() {
  const RouteName = useSelector((state) => state.RouteName.value);
  const dispatch = useDispatch();
  const [redirectToHome, setRedirectToHome] = useState(false);

  //handle error if exist
  const [isfailed, setisfailed] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const loginprocess = await Crud.createItem(
      { email, password },
      (response) => {
        console.log("response.data:", response.data);
        console.log("response.data.data:", response.data.data);

        window.localStorage.setItem(
          "User",
          JSON.stringify({
            data: {
              name: response.data.data.username,
              role: response.data.data.role,
              _id: response.data.data._id,
              token: response.data.token,
            },
          })
        );
        const storedUser = JSON.parse(window.localStorage.getItem("User"));
        dispatch(changeaccount(storedUser));
        console.log("success", response.data);
      }
    );
    console.log(loginprocess);

    if (loginprocess.stack) {
      setisfailed(1);
    } else {
      console.log("sucess");
      window.location.href = "/";
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Logo id="Logo-in-login" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {isfailed ? (
            <p className="text-red-500 text-center">
              Invalid email or password. Please try again.
            </p>
          ) : null}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                dispatch(changeroute("signup"));
              }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
