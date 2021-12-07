import { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { Dialog } from "@headlessui/react";

const Metadata = ({ metadata, language, name }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const showData = Object.keys(metadata).map((item) => {});
  console.log(name, language);
  return (
    <>
      <MdInfoOutline
        className={"mx-4 text-2xl cursor-pointer"}
        onClick={openModal}
      />
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-auto flex justify-center items-center h-screen"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className=" px-4 text-center">
          <div className="inline-block border-gray-900 w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all bg-white shadow-xl rounded-xl">
            <Dialog.Title
              as="h1"
              className="text-2xl font-medium leading-2 border-b-2 p-2 text-white bg-gray-800"
            >
              <span className="capitalize">
                {" "}
                {language} - {name}
              </span>
            </Dialog.Title>
            <div className="mt-2 border-b-2">
              <table className="">
                <tbody>
                  {Object.keys(metadata)
                    .filter((index) => metadata[index])
                    .map((item, i) => (
                      <tr
                        className={`align-top ${i % 2 ? "bg-gray-300" : ""}`}
                        key={item}
                      >
                        <td className="whitespace-nowrap">{item}</td>
                        <td>: {metadata[item]}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 float-right">
              <button
                type="button"
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Metadata;
