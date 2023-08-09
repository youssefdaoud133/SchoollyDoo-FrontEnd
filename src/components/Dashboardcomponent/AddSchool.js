import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import CountriesArray from "../CountriesArray";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import addnotification from "../../utils/addnotification";

// all import related to request
import CrudApi from "../../utils/CrudClass";
const CrudForAddSchool = new CrudApi(
  "http://localhost:8000/api/v1",
  "/Schools"
);
const CrudForAddNotification = new CrudApi(
  "http://localhost:8000/api/v1",
  "/Notifications"
);

export default function AddSchool() {
  // add variable to know success or failure
  const [success, setsuccess] = useState(false);
  const [failure, setfailure] = useState(false);
  const [errormsg, seterror] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the form element
    const form = event.target;

    // Create a new FormData object
    const formData = new FormData(form);

    // You can now use 'formData' to access the form data
    // For example, to get the values of the inputs:
    const schoolname = formData.get("school-name");
    const type_of_school = formData.get("type-of-school");
    const school_offers = formData.get("school-offers");
    const schoolcountry = formData.get("country-school");
    const street_address_school = formData.get("street-address-school");
    const city_school = formData.get("city-school");
    const about_school = formData.get("about_school");
    const phone = formData.get("phone");

    // Do something with the form data (e.g., send it to a server using fetch)
    // make request
    const storedUser = JSON.parse(window.localStorage.getItem("User"));

    const addschoolprocess = await CrudForAddSchool.createItem(
      {
        schoolname,
        type_of_school,
        school_offers,
        schoolcountry,
        street_address_school,
        city_school,
        about_school,
        phone,
      },
      () => {},
      storedUser.data.token
    );
    if (addschoolprocess.schoolname) {
      setsuccess(1);
      addnotification({
        message: `New School Added: [${schoolname}] - Check it out!`,
        to_manager: true,
        direction: "Schools To Active",
      });
    } else {
      setfailure(1);
      seterror(addschoolprocess.response.data.errors[0].msg);
    }
  };

  // render conditions
  let content;
  if (success) {
    content = (
      <>
        {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-500 sm:text-5xl">
              Success
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-600">
              Thank you for submitting your form! Your information has been sent
              successfully. Please wait for the manager to confirm your
              submission
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/Dashboard"
                onClick={() => {
                  setsuccess(0);
                }}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back Dashboard
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    content = (
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            School Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Fill in the school's data, and{" "}
            <span className="text-red-500">
              the application will be searched by the site manager
            </span>
          </p>
          {failure ? (
            <p className="text-red-500 text-center">{errormsg}</p>
          ) : null}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="school-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                School name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="school-name"
                  id="school-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="type-of-school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                type of school
              </label>
              <div className="mt-2">
                <select
                  id="type-of-school"
                  name="type-of-school"
                  autoComplete="type-of-school"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Affiliated to the Ministry of Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="school-offers"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                If other, describe what the school offers in few words
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="school-offers"
                  id="school-offers"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country-school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country-school"
                  name="country-school"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <CountriesArray />
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address-school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address-school"
                  id="street-address-school"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city-school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city-school"
                  id="city-school"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="about_school"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About School
              </label>
              <div className="mt-2">
                <textarea
                  id="about_school"
                  name="about_school"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900
      shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
      focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
      sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about school.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add School
          </button>
        </div>
      </form>
    );
  }

  return <>{content}</>;
}
