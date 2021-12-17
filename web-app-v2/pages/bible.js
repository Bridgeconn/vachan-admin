import React from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { MdVolumeUp, MdVolumeOff, MdInfoOutline } from "react-icons/md";
import Metadata from "../components/Metadata";

export const getStaticProps = async () => {
  const res = await fetch(process.env.baseUrl + "bibles");
  const bibles = await res.json();
  return {
    props: {
      bibles,
    },
  };
};

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = (value) => {
    setGlobalFilter(value || undefined);
  };

  return (
    <span>
      Bible :{" "}
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

const showBibleData = (bibles) => {
  const result = [];
  const showData = bibles.forEach((item) => {
    item.languageVersions.forEach((val) => {
      let bible = {
        language: item.language,
        name: val.version.name,
        code: val.version.code,
        revision: val.version.longName,
        audioBible: val.audioBible.name ? (
          <MdVolumeUp className="mx-4 text-2xl" />
        ) : (
          <MdVolumeOff className="mx-2 text-2xl" />
        ),
        metadata: val.metadata,
        published: val.metadata ? val.metadata.Latest : "",
      };
      result.push(bible);
    });
  });
  return result;
};

function Bibles({ bibles }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "language",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Code",
        accessor: "code",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Revision",
        accessor: "revision",
      },
      {
        Header: "Audio Bible",
        accessor: "audioBible",
      },
      {
        Header: "Metadata",
        accessor: "metadata",
        Cell: ({ value, row }) => {
          const data = row.original;
          return (
            <Metadata
              language={data.language}
              name={data.name}
              metadata={value}
            />
          );
        },
      },
      {
        Header: "Published",
        accessor: "published",
      },
    ],
    []
  );

  const data = React.useMemo(() => showBibleData(bibles), [bibles]);

  return <Table columns={columns} data={data} />;
}

export default Bibles;
