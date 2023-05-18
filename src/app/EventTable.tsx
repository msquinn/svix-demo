"use client";

import React, { useMemo } from "react";
import { EventTypeOut } from "svix";
import { useTable, Column } from "react-table";
import CreateEventModal from "@/app/CreateEventModal";
import { UseEventTable } from "@/hooks/UseEventTable";
import EditableCell from "@/app/EditableCell";

interface UseTableOptions<D extends object> {
  columns: Column<D>[];
  data: D[];
  updateMyData: (rowIndex: number, columnId: string, value: string) => void;
}

export default function EventTable() {
  const {
    eventTypes,
    onDelete,
    onSubmit,
    open,
    setOpen,
    submitDisabled,
    errorMessage,
    updateMyData,
  } = UseEventTable();

  const columns: Column<EventTypeOut>[] = useMemo(
    () => [
      {
        id: "eventType",
        Header: "",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Description",
            accessor: "description",
            Cell: EditableCell,
          },
          {
            id: "archived",
            Header: "",
            accessor: (d) => {
              return (
                <button
                  onClick={() => onDelete(d.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {" "}
                  delete{" "}
                </button>
              );
            },
          },
        ],
      },
    ],
    [onDelete]
  );
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: eventTypes?.data ?? [],
    updateMyData,
  } as UseTableOptions<EventTypeOut>);

  if (!eventTypes) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <CreateEventModal
        open={open}
        setOpen={setOpen}
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        submitDisabled={submitDisabled}
      />
      <div className="relative flex place-items-center">
        <div className="overflow-x-auto">
          {eventTypes.data.length > 0 ? (
            <table className="w-full table-auto">
              <thead className="text-center">
                {headerGroups.map((headerGroup) => {
                  return (
                    <tr key={headerGroup.getHeaderGroupProps().key}>
                      {headerGroup.headers.map((column) => (
                        <th key={`${column.id}`} className="px-4 py-2">
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  );
                })}
              </thead>
              <tbody className="text-left" {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr key={row.id}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            key={`${cell.column.id}-${cell.row}`}
                            className="border px-4 py-2"
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
          ) : (
            <div>No events found, try creating some!</div>
          )}
        </div>
      </div>
      <div className="float-right">
        <button
          className="my-2 mx-4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setOpen(true)}
        >
          Create
        </button>
      </div>
    </section>
  );
}
