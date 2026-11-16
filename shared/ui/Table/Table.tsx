"use client";

import { ChevronDownIcon, CheckIcon, MinusIcon } from "@heroicons/react/24/outline";
import { TableColumn, TableProps } from "@/shared/ui/Table/types";
import { useEffect, useRef, useState } from "react";
import Pagination from "./Pagination";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/shared/ui/skeleton";

function Table<T extends { id: string | number }>(props: TableProps<T>) {
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
    paginationClassName,
  } = props;

  const [selectedItems, setSelectedItems] = useState<Set<string | number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // small helper to safely join classes
  const join = (...parts: Array<string | false | null | undefined>) =>
    parts.filter(Boolean).join(" ");

  useEffect(() => {
    if (props.clearSelectionTrigger) {
      setSelectedItems(new Set());
      setSelectAll(false);
    }
  }, [props.clearSelectionTrigger]);

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
      <div className={className}>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full">
            {hasHeaders && (
              <thead>
                <tr>
                  {selectable && (
                    <th>
                      <div className="flex h-5 w-5 rounded-sm border border-card-line bg-transparent" />
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.label ?? column.key}
                      scope="col"
                      className={column.className || ""}
                      style={{ width: column.width }}
                    >
                      {column.label}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th scope="col" className="relative">
                      <span className="sr-only">Actions</span>
                    </th>
                  )}
                </tr>
              </thead>
            )}
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {selectable && (
                    <td>
                      <div className="flex h-5 w-5 rounded-sm border border-card-line bg-transparent" />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.label ?? column.key}
                      className={cn("whitespace-nowrap px-6 py-4", column.className || "")}
                    >
                      <Skeleton className="h-4 w-full rounded" />
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td>
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return <TableVariant {...props} />;
  }

  return (
    <div className={className}>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full">
          {hasHeaders && (
            <thead>
              <tr>
                {selectable && (
                  <th>
                    <div
                      role="button"
                      aria-label="Select all rows"
                      onClick={handleHeaderToggle}
                      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-card-line bg-transparent hover:border-accent"
                    >
                      {allSelected ? (
                        <CheckIcon className="h-4 w-4 stroke-3 text-accent" />
                      ) : someSelected ? (
                        <MinusIcon className="h-4 w-4 stroke-3 text-accent" />
                      ) : null}
                    </div>
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.label ?? column.key}
                    scope="col"
                    className={column.className || ""}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
                {actions.length > 0 && (
                  <th scope="col" className="relative">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
          )}
          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                  className="text-center text-sm text-muted-foreground py-10"
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
                    onItemClick || getRowHref ? "cursor-pointer" : ""
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemClick && onItemClick(item);
                  }}
                >
                  {selectable && (
                    <td>
                      <div
                        role="button"
                        aria-label="Select row"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectItem(item.id);
                        }}
                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm border border-card-line bg-transparent hover:border-accent"
                      >
                        {selectedItems.has(item.id) && (
                          <CheckIcon className="h-4 w-4 stroke-3 text-accent" />
                        )}
                      </div>
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={column.label ?? column.key}
                      className={cn(
                        column.className || "",
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
                    <td className="text-right">
                      <div className="relative inline-block text-left" ref={dropdownRef}>
                        <button
                          type="button"
                          className="dd-action-btn flex items-center justify-center"
                          onClick={(e) => { e.stopPropagation(); toggleDropdown(item.id); }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-[15px] w-[15px]"><circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/></svg>
                        </button>
                        {openDropdownId === item.id && (
                          <div className="dropdown-menu align-left open" style={{ right: 0, left: 'auto', minWidth: '160px' }}>
                            {actions
                              .filter((action) => !action.condition || action.condition(item))
                              .map((action, actionIndex) => (
                                <button
                                  key={actionIndex}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(item);
                                    setOpenDropdownId(null);
                                  }}
                                  className={cn("dropdown-item", action.className)}
                                >
                                  {action.label}
                                </button>
                              ))}
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
      {isPaginated && (
        <Pagination
          className={paginationClassName}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange!}
        />
      )}
    </div>
  );
};
const TableVariant = <T extends { id: string | number }>(props: TableProps<T>) => {
  const {
    data,
    columns,
    emptyMessage,
    hasHeaders = true,
    isPaginated = false,
    currentPage = 1,
    totalPages = 1,
    onPageChange,
    paginationClassName,
  } = props;

  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) return column.render(item, index);
    const value = column.key.split(".").reduce((obj: any, key) => obj?.[key], item);
    return value ?? "N/A";
  };

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-t border-b border-y-[#e5e7eb]">
          {hasHeaders && (
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.label ?? column.key}
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
                      key={column.label ?? column.key}
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

      {isPaginated && onPageChange && (
        <Pagination
          className={cn("bg-transparent border-x-0 border-b-0 rounded-none px-0", paginationClassName)}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
export default Table;
