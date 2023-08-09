import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import CountriesList from "../components/CountriesArray";
import { countries } from "country-cities";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddSchool from "./Dashboardcomponent/AddSchool";
import SchoolsToActive from "./Dashboardcomponent/SchoolsToActive";
import Myschool from "./Dashboardcomponent/Myschool";
import ApplyToSchool from "./Dashboardcomponent/ApplyToSchool";
import DashboardOptions from "../utils/DashboardOptions";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboardcomponent(props) {
  const { option } = useParams();

  const AccountName = useSelector((state) => state.AccountName.value);
  const [options, setoptions] = useState(
    DashboardOptions(AccountName.data.role)[0].label
  );
  useEffect(() => {
    if (option) {
      setoptions(option);
    }
  }, []);
  let content;
  if (options === "Add School") {
    content = <AddSchool />;
  } else if (options === "Schools To Active") {
    content = <SchoolsToActive />;
  } else if (options === "My school") {
    content = <Myschool />;
  } else if (options === "apply to school") {
    content = <ApplyToSchool />;
  }

  console.log(option);
  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {AccountName.data.role} Settings
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="options"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Options
            </label>
            <div className="sm:col-span-2 sm:col-start-1">
              <div className="mt-2">
                <select
                  id="options"
                  name="options"
                  autoComplete="country-name"
                  value={options}
                  onChange={(e) => {
                    setoptions(e.target.value);
                  }} // Update the state variable on change
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {DashboardOptions(AccountName.data.role).map((option) => {
                    return <option>{option.label}</option>;
                  })}
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
