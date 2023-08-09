import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import CountriesList from "../components/CountriesArray";
import { countries } from "country-cities";
import { useState } from "react";
import SignUpForLeaders from "./SignUpForLeaders";
import SignUpForTeachers from "./SignUpForTeachers";

export default function Signup() {
  const [Role, setRole] = useState("student");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  let content;
  if (Role === "leader") {
    content = <SignUpForLeaders Role={Role} />;
  } else if (Role === "teacher") {
    content = <SignUpForTeachers Role={Role} />;
  } else if (Role === "student") {
    content = <div>Student Content</div>;
  } else if (Role === "parent") {
    content = <div>Parent Content</div>;
  }

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Choose a role
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="Role"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your Role
            </label>
            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <select
                  id="Role"
                  name="Role"
                  autoComplete="country-name"
                  value={Role} // Bind the selected value to the state variable
                  onChange={(e) => setRole(e.target.value)} // Update the state variable on change
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>leader</option>
                  <option>teacher</option>
                  <option>student</option>
                  <option>parent</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* if leader show SignUpForLeaders */}
      {content}
    </div>
  );
}
