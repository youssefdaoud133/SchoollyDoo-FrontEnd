import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import CrudApi from "../../utils/CrudClass";
import addnotification from "../../utils/addnotification";
const Crud = new CrudApi("http://localhost:8000/api/v1", "/schools/myschool");
const imgalt = require("../../photos/100th-day-of-school-cartoon-colored-clipart-free-vector.jpg");

export default function Example() {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [schools, setschools] = useState([]);
  const [isnetworkproblem, setisnetworkproblem] = useState(0);

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

  const [numofitems, setnumofitems] = useState(data.result);

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

  // Define the click handler function to accept
  const handleButtonClickToaccept = async (schoolId, schoolname, ownerid) => {
    try {
      const response = await Crud.updateItem(schoolId, { active: true });
      console.log("School ID:", schoolId);
      setschools((prevSchools) =>
        prevSchools.filter((school) => school._id !== schoolId)
      );
      addnotification({
        message: `your school: [${schoolname}] is Accepted`,
        to: ownerid,
        direction: "My school",
      });
      console.log(response);
    } catch (error) {
      setisnetworkproblem(1);
    }
  };
  // Define the click handler function to Declined
  const handleButtonClickToDeclined = async (schoolId, schoolname, ownerid) => {
    try {
      const response = await Crud.deleteItem(schoolId);
      console.log("School ID:", schoolId);
      setschools((prevSchools) =>
        prevSchools.filter((school) => school._id !== schoolId)
      );
      addnotification({
        message: `your school: [${schoolname}] is Declined`,
        to: ownerid,
        direction: "My schools",
      });
      console.log(response);
    } catch (error) {
      setisnetworkproblem(1);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            My Schools
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
                      About : {school.about_school}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      type of school : {school.type_of_school}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Country : {school.schoolcountry}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      About of leader : {school.owner.about}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{school.color}</p>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <Link
                        to={`/Dashboard/schools/${school.schoolname}/${school._id}`}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                      >
                        Show
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
