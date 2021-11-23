import Link from "next/link";
import React from "react";
import { BsBookHalf, BsCalendar2EventFill } from "react-icons/bs";
import {
  MdOutlineComment,
  MdFormatShapes,
  MdImage,
  MdVideocam,
} from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { Tab } from "@headlessui/react";
import Topbar from "../components/Topbar";

// function Language({ name }) {
//   return (
//     <Link className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded border-b-2 hover:bg-gray-300">
//       <span className="leading-none text-xl">{name}</span>
//     </Link>
//   );
// }

const Dashboard = () => {
  return (
    <div>
      <Topbar />
      <div className="mx-auto bg-white mt-24 md:mt-0 h-screen">
        <div className="flex text-gray-900 border-t-2 bg-gray-300 h-full w-full">
          <Tab.Group vertical>
            <Tab.List className="flex flex-col w-60 p-4 bg-gray-900 text-gray-100">
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <BsBookHalf className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Bible</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <MdOutlineComment className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Commentaries</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <MdFormatShapes className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Dictionaries</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <MdImage className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Infograpichs</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <MdVideocam className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Video</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <FaBookReader className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Bible Stories</span>
              </Tab>
              <Tab className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
                <BsCalendar2EventFill className="w-8 h-8" />
                <span className="ml-2 text-sm font-medium">Reading Plans</span>
              </Tab>
            </Tab.List>
            <Tab.Panels className="p-10 text-gray-900 w-full">
              <Tab.Panel className="bg-gray-100 rounded px-4">Bible</Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">
                Commentaries
              </Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">
                Dictionaries
              </Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">
                Infograpichs
              </Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">Video</Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">
                Bible Stories
              </Tab.Panel>
              <Tab.Panel className="bg-gray-100 rounded px-4">
                Reading Plans
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
