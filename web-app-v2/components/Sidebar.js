import Link from "next/link";
import {
  MdOutlineComment,
  MdFormatShapes,
  MdImage,
  MdVideocam,
  MdImportContacts,
  MdVolumeUp,
  MdList,
  MdInfoOutline,
} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center w-60 h-full overflow-hidden text-gray-400 bg-gray-900 border-t-2">
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3">
          <Link href="/bible">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdImportContacts className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Bible</span>
            </a>
          </Link>
          <Link href="/commentaries">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdOutlineComment className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Commentaries</span>
            </a>
          </Link>
          <Link href="/dictionaries">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdFormatShapes className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Dictionaries</span>
            </a>
          </Link>
          <Link href="/infographics">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdImage className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Infograpichs</span>
            </a>
          </Link>
          <Link href="/audiobible">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdVolumeUp className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Audio Bible</span>
            </a>
          </Link>
          <Link href="/videos">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdVideocam className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Videos</span>
            </a>
          </Link>
          <Link href="/booknames">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdList className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Booknames</span>
            </a>
          </Link>
          <Link href="/metadata">
            <a className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300">
              <MdInfoOutline className="w-8 h-8" />
              <span className="ml-2 text-sm font-medium">Metadata</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
