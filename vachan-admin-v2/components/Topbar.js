import Link from "next/link";
import React, { Fragment } from "react";

import { FaHome } from "react-icons/fa";
import { Menu, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";

const Topbar = () => {
  return (
    <div className="text-gray-100 bg-gray-900 p-4 sticky top-0 z-50">
      <Link href="#">
        <a className="flex items-center w-full h-12 px-3 mt-2">
          <FaHome className="w-10 h-10" />
          <span className="ml-2 text-2xl font-bold">Vachan Admin</span>
        </a>
      </Link>
      <div className="w-60 text-right fixed right-10 top-6">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-100 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Username
              <HiChevronDown
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  <button className="flex rounded-md items-center w-full px-2 py-2 text-gray-900">
                    Log out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Topbar;
