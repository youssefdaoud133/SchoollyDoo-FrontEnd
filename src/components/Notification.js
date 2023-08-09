import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames"; // Import classNames here
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import guestLogo from "../pictures/guestF.png";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import CrudApi from "../utils/CrudClass";
import DirectionOfNotification from "../utils/DirectionOfNotification";

// Redux slices
import { addReadNotificatin } from "../rtk/slices/ReadNotificatinsSlice";

const Crud = new CrudApi(
  "http://localhost:8000/api/v1",
  "/Notifications/AllNotificationsForThisUser"
);

export default function Notification(props) {
  const ReadNotificatins = useSelector((state) => state.ReadNotificatins.value);
  const AccountName = useSelector((state) => state.AccountName.value);
  const dispatch = useDispatch();

  // loading and request process
  const [notifications, setnotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(window.localStorage.getItem("User"));
        // Fetch data using Axios
        const response = await Crud.fetchItemsnotifications(() => {
          setIsLoading(false);
        }, storedUser.data.token);
        setnotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // setIsLoading(0);
    console.log(ReadNotificatins.data); // Log the updated state value
  }, [notifications, ReadNotificatins]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    ); // Display a loading indicator
  }

  return (
    <>
      {AccountName.data.name && (
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6 text-white" aria-hidden="true" />

              {/* Smaller Red Circle with Zero */}
              <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 bg-red-600 text-white text-xs font-bold rounded-full">
                {notifications.result}
              </span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {/* Dropdown Menu Items */}
              {notifications.data.map((notification) => (
                <Menu.Item
                  key={notification._id}
                  as={Link}
                  to={`/dashboard/${notification.direction}`}
                  onClick={async () => {
                    console.log(notification.direction);
                    dispatch(addReadNotificatin(notification._id));
                    // Remove the clicked notification from the list
                    setnotifications((prevNotifications) => ({
                      ...prevNotifications,
                      data: prevNotifications.data.filter(
                        (item) => item._id !== notification._id
                      ),
                      result: prevNotifications.result - 1,
                    }));

                    const CrudOnce = new CrudApi(
                      "http://localhost:8000/api/v1",
                      `/Notifications/OneNotificationsForThisUser`
                    );

                    const loginprocess = await CrudOnce.updateItem(
                      notification._id,
                      { read: true }
                    );
                    console.log(loginprocess);

                    console.log(notification._id);
                  }}
                >
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {/* Render notification content here */}
                      <div className="flex items-center space-x-2">
                        {/* Red dot */}
                        {notification.read === false && (
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        )}

                        <img
                          src={props.guest_AccountName.imageUrl}
                          alt="User Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-bold">
                            {notification.owner.username}
                          </p>
                          <p>{notification.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
}
