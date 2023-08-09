import React, { useState, useEffect, Fragment } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

// import notification component
import Notification from "./Notification";
// import AccountNameNavigation
import AccountNameNavigationfun from "../utils/AccountNameNavigation";

// CSS
import "./css/Navbar.css";

// Components
import Home from "../components/Home";
import About from "../components/About";
import Contact from "../components/Contact";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Myprofile from "../components/Myprofile";
import Dashboard from "../components/DashboardContent";
import Myschool from "../components/leadercomponent/Myschool";

// Redux slices
import { changeroute } from "../rtk/slices/RouteSlice";
import { changeaccount } from "../rtk/slices/AccountSlice";
// import { changerole } from "../rtk/slices/RoleSlice";

// Images
import Logo from "../pictures/LogoF2.png";
import guestLogo from "../pictures/guestF.png";

// Constants
const guest_AccountName = {
  name: "guest",
  imageUrl: guestLogo,
};
// const AccountNameNavigation = AccountNameNavigationfun();

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const RouteName = useSelector((state) => state.RouteName.value);
  const AccountName = useSelector((state) => state.AccountName.value);
  // const RoleName = useSelector((state) => state.RoleName.value);
  const dispatch = useDispatch();
  const [issigned, setissigned] = useState(false);

  const AccountNameNavigation = AccountNameNavigationfun(AccountName.data.role);

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "#", current: true },
    { name: "Contact", href: "#", current: false },
    { name: "About", href: "#", current: false },
  ]);

  // AccountNameNavigationfun

  const handleNavigationClick = (name) => {
    const updatedNavigation = navigation.map((item) => {
      if (item.name === name) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavigation(updatedNavigation);
    dispatch(changeroute(name));
  };

  useEffect(() => {
    if (AccountName.data.name.length > 0) {
      setissigned(true);
    }
  }, [AccountName.data.name]);

  const handleSignOut = () => {
    localStorage.removeItem("User");
    window.location.href = "/";
  };

  return (
    <>
      <Router>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          id="LogoNav"
                          className="h-8 w-8"
                          src={Logo}
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={
                                item.name.toLowerCase() === "home"
                                  ? "/"
                                  : item.name.toLowerCase().replace(/\s/g, "")
                              }
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium"
                              )}
                              onClick={() => {
                                handleNavigationClick(item.name);
                              }}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {AccountName.data.name && (
                          <Notification guest_AccountName={guest_AccountName} />
                        )}

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">
                                Open AccountName menu
                              </span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  AccountName.data.name
                                    ? AccountName.imageUrl
                                    : guest_AccountName.imageUrl
                                }
                                alt=""
                              />
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {AccountNameNavigation.map((item) => {
                                return (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.name
                                          .toLowerCase()
                                          .replace(/\s/g, "")}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                        onClick={() => {
                                          if (item.name === "Sign out") {
                                            handleSignOut();
                                          } else {
                                            handleNavigationClick(item.name);
                                          }
                                        }}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                );
                              })}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as={Link}
                        to={
                          item.name.toLowerCase() === "home"
                            ? "/"
                            : item.name.toLowerCase().replace(/\s/g, "")
                        }
                        onClick={() => {
                          handleNavigationClick(item.name);
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            AccountName.data.name
                              ? AccountName.imageUrl
                              : guest_AccountName.imageUrl
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {AccountName.data.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {AccountName.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {AccountNameNavigation.map(
                        (
                          item // Exclude the element from rendering
                        ) => (
                          <Disclosure.Button
                            key={item.name}
                            as={Link}
                            to={item.name.toLowerCase().replace(/\s/g, "")}
                            onClick={() => {
                              if (item.name === "Sign out") {
                                handleSignOut();
                              } else {
                                handleNavigationClick(item.name);
                              }
                            }}
                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Disclosure.Button>
                        )
                      )}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {RouteName}
              </h1>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/myprofile" element={<Myprofile />} />
                <Route
                  path="/Dashboard/:option"
                  element={<Dashboard Role={AccountNameNavigation} />}
                />
                <Route
                  path="/Dashboard"
                  element={<Dashboard Role={AccountNameNavigation} />}
                />
                <Route
                  path="/Dashboard/schools/:schoolname/:id"
                  element={<Myschool />}
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </>
  );
}
