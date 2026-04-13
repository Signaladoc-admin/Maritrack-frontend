"use client";

import { ChevronDownIcon, CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import { TableColumn, TableProps } from "@/shared/ui/Table/types";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const Table = <T extends { id: string | number }>(props: TableProps<T>) => {
  // Destructure props
  const {
    variant = "default",
    data,
    columns,
    loading = false,
    emptyMessage = "No data found.",
    onRowSelect,
    selectable = false,
    actions = [],
    className = "",
    rowClassName,
    loaderComponent,
    onItemClick,
    getRowHref,
    isPaginated = true,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    hasHeaders = true,
  } = props;

  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // small helper to safely join classes
  const join = (...parts: Array<string | false | null | undefined>) =>
    parts.filter(Boolean).join(" ");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;

      // Don't close if clicking on dropdown items or the dropdown itself
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setOpenDropdownId(null);
      }
    };

    // Only add listener when dropdown is open
    if (openDropdownId) {
      // Use setTimeout to ensure this runs after other click handlers
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdownId]);

  const toggleDropdown = (id: string | number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const total = data?.length ?? 0;
  const selectedCount = selectedItems.size;
  const allSelected = total > 0 && selectedCount === total;
  const someSelected = selectedCount > 0 && selectedCount < total;

  const handleHeaderToggle = () => {
    if (allSelected || someSelected) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      setSelectedItems(new Set(data?.map((item) => item.id)));
      setSelectAll(true);
    }
  };

  const handleSelectItem = (id: string | number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === data?.length);
  };

  // Notify parent of selection changes
  useEffect(() => {
    if (onRowSelect) {
      const selectedData = data?.filter((item) => selectedItems.has(item.id));
      onRowSelect(selectedData);
    }
  }, [selectedItems, data, onRowSelect]);

  const renderCellContent = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }

    // Default rendering - access nested properties using dot notation
    const value = column.key.split(".").reduce((obj: any, key) => obj?.[key], item);
    return value ?? "N/A";
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (variant === "minimal") {
    return <TableVariant {...props} />;
  }

  return (
    <div>
      <div
        className={cn(
          `grid w-full max-w-full min-w-0 grid-cols-1 overflow-hidden bg-gray-50 shadow-sm`,
          isPaginated ? "rounded-t-2xl" : "rounded-2xl",
          className
        )}
      >
        <div className="w-full overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {hasHeaders && (
              <thead className="bg-[#deeaff]">
                <tr>
                  {selectable && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                    >
                      <div
                        role="button"
                        aria-label="Select all rows"
                        onClick={handleHeaderToggle}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-gray-400 bg-transparent hover:border-[#7f56d9]"
                      >
                        {allSelected ? (
                          <CheckIcon className="h-4 w-4 stroke-3 text-[#7f56d9]" />
                        ) : someSelected ? (
                          <MinusIcon className="h-4 w-4 stroke-3 text-[#7f56d9]" />
                        ) : null}
                      </div>
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.label}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium tracking-wider ${
                        column.className || ""
                      }`}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-200 bg-white">
              {data?.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                    className="px-6 py-4 text-center text-sm whitespace-nowrap text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={cn(
                      rowClassName ? rowClassName(item, index) : "",
                      (onItemClick || getRowHref) ? "cursor-pointer" : ""
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      onItemClick && onItemClick(item);
                    }}
                  >
                    {selectable && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          role="button"
                          aria-label="Select row"
                          onClick={() => handleSelectItem(item.id)}
                          className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-gray-400 bg-transparent hover:border-[#7f56d9]"
                        >
                          {selectedItems.has(item.id) && (
                            <CheckIcon className="h-4 w-4 stroke-3 text-[#7f56d9]" />
                          )}
                        </div>
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.label}
                        className={cn(
                          "px-6 py-4 text-sm whitespace-nowrap",
                          column.className || "text-gray-500",
                          colIndex === 0 && getRowHref ? "relative" : ""
                        )}
                      >
                        {colIndex === 0 && getRowHref && (
                          <Link
                            href={getRowHref(item)}
                            className="absolute inset-0"
                            aria-label="View row"
                          />
                        )}
                        {renderCellContent(column, item, index)}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                          <button
                            type="button"
                            className="focus:ring-primary inline-flex w-full cursor-pointer justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                            onClick={() => toggleDropdown(item.id)}
                          >
                            Actions
                            <ChevronDownIcon
                              className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ${
                                openDropdownId === item.id ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                          {openDropdownId === item.id && (
                            <div className="ring-opacity-5 absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none">
                              <div className="py-1">
                                {actions
                                  .filter((action) => !action.condition || action.condition(item))
                                  .map((action, actionIndex) => (
                                    <button
                                      key={actionIndex}
                                      onClick={() => {
                                        action.onClick(item);
                                        setOpenDropdownId(null);
                                      }}
                                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                                        action.className || "text-gray-700"
                                      }`}
                                    >
                                      {action.label}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isPaginated && (
        <div className="overflow-hidden rounded-b-2xl shadow-sm">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange!}
          />
        </div>
      )}
    </div>
  );
};
const TableVariant = <T extends { id: string | number }>(props: TableProps<T>) => {
  const { data, columns, emptyMessage, hasHeaders = true } = props;

  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) return column.render(item, index);
    const value = column.key.split(".").reduce((obj: any, key) => obj?.[key], item);
    return value ?? "N/A";
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-t border-b border-y-[#e5e7eb]">
        {hasHeaders && (
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.label}
                  scope="col"
                  className="py-2 pr-6 text-left text-xs font-medium tracking-wider text-gray-500 first:pl-0"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-[#e5e7eb]">
          {!data?.length ? (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td
                    key={column.label}
                    className={
                      column.className ??
                      "py-4 pr-6 text-sm whitespace-nowrap text-[#6B7280] first:pl-0"
                    }
                    style={{ width: column.width }}
                  >
                    {renderCell(column, item, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
