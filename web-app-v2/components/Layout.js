import { Children } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen flex-col">
      <Topbar className="h-screen" />
      <div className="flex w-screen h-screen overflow-hidden">
        <Sidebar />
        <div className="text-gray-800 p-8 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
