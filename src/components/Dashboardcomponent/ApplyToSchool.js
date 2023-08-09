import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import CrudApi from "../../utils/CrudClass";
import addnotification from "../../utils/addnotification";
const Crud = new CrudApi("http://localhost:8000/api/v1", "/schools");
const Crudforapply = new CrudApi("http://localhost:8000/api/v1", "/Applies");

const imgalt = require("../../photos/100th-day-of-school-cartoon-colored-clipart-free-vector.jpg");

export default function Example() {
  const [data, setData] = useState({});
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);
  const [errormsg, seterrormsg] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [schools, setschools] = useState([]);
  const [isnetworkproblem, setisnetworkproblem] = useState(0);
  const [numofitems, setnumofitems] = useState(data.result);
  const storedUser = JSON.parse(window.localStorage.getItem("User"));

  // make request
  // request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(window.localStorage.getItem("User"));
        // Fetch data using Axios
        const response = await Crud.fetchSchoolsToActive(() => {
          setIsLoading(false);
        }, storedUser.data.token);
        setData(response);
        setschools(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Define the click handler function to apply
  const handleButtonClickToaccept = async (
    schoolId,
    schoolname,
    schoolownerid
  ) => {
    try {
      const response = await Crudforapply.createItem(
        {
          schoolname: schoolname,
          owner: storedUser.data._id,
          to: schoolownerid,
          school: schoolId,
          as: storedUser.data.role,
        },
        (res) => {
          console.log(res);
        },
        storedUser.data.token
      );
      if (response.schoolname) {
        setschools((prevSchools) =>
          prevSchools.filter((school) => school._id !== schoolId)
        );
        addnotification({
          message: `New Apply Added For: [${schoolname}] - Check it out!`,
          to: schoolownerid,
          owner: storedUser.data._id,
          direction: `schools/${schoolname}/${schoolId}`,
        });
        setsuccess(1);
      }
      console.log(response);
      if (response.errormsg) {
        seterror(1);
        seterrormsg(response.errormsg);
      }
    } catch (error) {
      setisnetworkproblem(1);
    }
  };

  useEffect(() => {
    setnumofitems(schools.length); // Log the updated state value
  }, [schools]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    ); // Display a loading indicator
  }

  if (success || error) {
    return (
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
            <h1
              className={`mt-4 text-3xl font-bold tracking-tight ${
                success ? "text-green-500" : "text-red-500"
              } sm:text-5xl`}
            >
              {success ? "Success" : "Error"}
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-600">
              {success
                ? `Thank you for submitting your apply! Your information has been
              sent successfully. Please wait for the Leader to confirm your
              submission`
                : errormsg}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/Dashboard"
                onClick={() => {
                  setsuccess(0);
                  seterror(0);
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
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Apply To School
        </h2>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Result {numofitems}
        </h2>
        {isnetworkproblem ? (
          <p className="text-red-500 text-center">
            Invalid network Please try again.
          </p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {schools.map((school) => (
            <div key={school._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={imgalt}
                  alt={imgalt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    School Name : {school.schoolname}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Owner : {school.owner.username}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Owner Phone : {school.owner.phone}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    type of school : {school.type_of_school}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Country : {school.schoolcountry}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">{school.color}</p>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        handleButtonClickToaccept(
                          school._id,
                          school.schoolname,
                          school.owner._id
                        );
                      }}
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
