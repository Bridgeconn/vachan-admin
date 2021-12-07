import React, { useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { MdInfoOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

export const getStaticProps = async () => {
  const res = await fetch(process.env.baseUrl + "booknames");
  const booknames = await res.json();
  return {
    props: {
      booknames,
    },
  };
};

// Define a default UI for filtering
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <span>
      Book Names :{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search...`}
        style={{
          fontSize: "1.1rem",
          border: "1px solid #000",
          padding: "5px",
          marginBottom: "5px",
          borderRadius: "5px",
        }}
      />
    </span>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      className="border-2 bg-white p-2 border-gray-900"
    >
      <option value="">All Language</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

// Let the table remove the filter if the string is empty

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: "",
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headers,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <>
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-400 border-4"
      >
        <thead className="bg-gray-300">
          <tr>
            {headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                {column.render("Header")}
                <div>{column.canFilter ? column.render("Filter") : null}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-400"
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell, j) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={j}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const showBooknamesData = (booknames) => {
  const result = [];
  const showData = booknames.forEach((item) => {
    Object.values(item.bookNames).map((item2) => {
      console.log(item2);
      let booknames = {
        language: item.language.name,
        abbreviation: item2.abbr,
        short: item2.short,
        long: item2.long,
        bookCode: item2.book_code,
      };
      result.push(booknames);
    });
  });
  return result;
};

function BookNames({ booknames }) {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "language",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Book code",
        accessor: "bookCode",
      },
      {
        Header: "Abbreviation",
        accessor: "abbreviation",
      },
      {
        Header: "Short",
        accessor: "short",
      },
      {
        Header: "Long",
        accessor: "long",
      },
    ],
    []
  );

  const data = React.useMemo(() => showBooknamesData(booknames), [booknames]);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex font-medium justify-center p-3 m-2 border-2 bg-gray-600 text-white rounded-full float-right hover:bg-opacity-90"
      >
        <FaPlus className="my-1 mx-2" />
        Add bookName
      </button>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto overflow-x-auto h-screen top-40"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <div className="inline-block border-gray-900 w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all bg-white shadow-xl rounded-xl">
            <Dialog.Title
              as="h1"
              className="text-lg font-medium leading-6 text-gray-900 border-b-2 p-2"
            >
              Add BookNames
            </Dialog.Title>
            <div className="mt-2 border-b-2">
              <form className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-first-name"
                    >
                      Name
                    </label>
                    <input
                      className="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                      id="grid-first-name"
                      type="text"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-last-name"
                    >
                      Abbreviation
                    </label>
                    <input
                      className="appearance-none block w-full text-gray-700 border border-gray-700 rounded py-3 px-4 leading-tight"
                      id="grid-last-name"
                      type="text"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-gray-700 hover:border-transparent rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <Table columns={columns} data={data} />
    </>
  );
}

export default BookNames;
