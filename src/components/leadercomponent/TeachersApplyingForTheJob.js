import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import CrudApi from "../../utils/CrudClass";
import addnotification from "../../utils/addnotification";
const Crud = new CrudApi("http://localhost:8000/api/v1", "/Applies/unactive");
const CrudForUsers = new CrudApi("http://localhost:8000/api/v1", "/users");
const maleimgalt = require("../../pictures/pngaaa.com-266413.png");
const femaleimgalt = require("../../pictures/vecteezy_cartoon-teacher-woman_9415668_972.png");

export default function TeachersApplyingForTheJob() {
  const [data, setData] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [applies, setapplies] = useState([]);
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
        setapplies(response.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [numofitems, setnumofitems] = useState(data.result);

  useEffect(() => {
    setnumofitems(applies.length); // Log the updated state value
  }, [applies]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    ); // Display a loading indicator
  }

  // Define the click handler function to accept
  const handleButtonClickToaccept = async (applyId, schoolname, ownerid) => {
    try {
      const response = await Crud.updateItem(applyId, { active: true });
      const responseuser = await CrudForUsers.updateItem(ownerid, {
        company: schoolname,
      });
      setapplies((prevApplies) =>
        prevApplies.filter((Apply) => Apply._id !== applyId)
      );
      addnotification({
        message: `your apply to : [${schoolname}] is Accepted`,
        to: ownerid,
        direction: "",
      });
      console.log(response);
      console.log(responseuser);
    } catch (error) {
      setisnetworkproblem(1);
    }
  };
  // Define the click handler function to Declined
  const handleButtonClickToDeclined = async (applyId, schoolname, ownerid) => {
    try {
      const response = await Crud.deleteItem(applyId);
      console.log("applyId ID:", applyId);
      setapplies((prevSchools) =>
        prevSchools.filter((school) => school._id !== applyId)
      );
      addnotification({
        message: `your apply for : [${schoolname}] is Declined`,
        to: ownerid,
        direction: "",
      });
      console.log(response);
    } catch (error) {
      setisnetworkproblem(1);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Teachers Applies For Your School
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
          {applies.map((apply) => (
            <div key={apply._id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={apply.owner.profileIMG}
                  // alt={imgalt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    Name : {apply.owner.username}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    teacher Phone : {apply.owner.phone}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    About : {apply.owner.about}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Country : {apply.owner.country}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    supject : {apply.owner.supject}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{apply.color}</p>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      onClick={() =>
                        handleButtonClickToaccept(
                          apply._id,
                          apply.schoolname,
                          apply.owner._id
                        )
                      }
                      className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => {
                        handleButtonClickToDeclined(
                          apply._id,
                          apply.schoolname,
                          apply.owner._id
                        );
                      }}
                      type="button"
                      className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 cursor-pointer"
                    >
                      Declined
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
