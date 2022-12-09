import * as React from 'react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  FilterFn,
  getFilteredRowModel,
} from '@tanstack/react-table'
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import { SearchIcon, SortIcon, SortUpIcon, SortDownIcon } from './shared/icons'
import { Button, PageButton } from './shared/buttons'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
  interface ColumnMeta<TData extends unknown, TValue> {
    filterComponent: (props: any) => any
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({
    itemRank,
  })

  return itemRank.passed
}

export type TableProps<Data extends object> = {
  columns: ColumnDef<Data, any>[]
  data: Data[]
}

export default function DataTable<Data extends object>({
  columns,
  data,
}: TableProps<Data>) {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    columns,
    data,
    enableFilters: true,
    enableGlobalFilter: true,
    enableColumnFilters: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  })

  if (!data) {
    return <p>Loading..</p>
  }

  return (
    <>
      <div className="relative my-5 flex max-w-full gap-2 sm:max-w-xs">
        {/* eslint-disable-next-line no-use-before-define */}
        <GlobalFilter
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 top-0 flex items-center pl-4">
          <SearchIcon className="h-3.5 w-4 text-gray-400" />
        </div>
      </div>
      <div className="mb-10 flex flex-col">
        <div className="-my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block w-full align-middle sm:px-6 lg:px-8">
            {/* Desktop Table */}
            <div className="hidden overflow-auto rounded-lg border-b border-gray-200 shadow dark:border-gray-800 sm:block">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:cursor-pointer hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <div className="flex items-center justify-between">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <span>
                              {/* eslint-disable-next-line no-nested-ternary */}
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === 'desc' ? (
                                  <SortDownIcon className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <SortUpIcon className="h-4 w-4 text-gray-400" />
                                )
                              ) : header.column.getCanSort() ? (
                                <SortIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              ) : null}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-900 dark:bg-gray-800">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 text-sm text-gray-700 dark:text-gray-50"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Table */}
            <div className="grid grid-cols-1 gap-2 sm:hidden">
              <div className="space-y-2 rounded-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                {table.getRowModel().rows.map((row) => (
                  <div
                    className="flex px-2 py-4 text-sm shadow-sm"
                    key={row.id}
                  >
                    <div className="border-r border-gray-100 p-2">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <div
                          className="space-y-5 uppercase"
                          key={headerGroup.id}
                        >
                          {headerGroup.headers.slice(0, 1).map((header) => (
                            <div key={header.id}>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div>
                      {row.getVisibleCells().map((cell) => (
                        <div className="p-2" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between py-3">
              <div className="flex flex-1 items-center justify-between sm:hidden">
                <Button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Prev
                </Button>
                <span className="text-sm text-gray-700">
                  Page&nbsp;
                  <span className="font-medium">
                    {table.getState().pagination.pageIndex + 1}&nbsp;
                  </span>
                  of&nbsp;
                  <span className="font-medium">{table.getPageCount()}</span>
                </span>
                <Button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div className="flex items-center gap-x-2">
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    Page&nbsp;
                    <span className="font-medium">
                      {table.getState().pagination.pageIndex + 1}&nbsp;
                    </span>
                    of&nbsp;
                    <span className="font-medium">{table.getPageCount()}</span>
                  </span>
                  <select
                    name="Page Size"
                    aria-label="Page Size"
                    className="mt-1 block w-full rounded-lg border-gray-200 text-sm shadow focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:ring-opacity-75 dark:border-gray-800 dark:bg-gray-800"
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <nav
                  className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <PageButton
                    className="rounded-l-md"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">First</span>
                    <ChevronDoubleLeftIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </PageButton>
                  <PageButton
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </PageButton>

                  <PageButton
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </PageButton>
                  <PageButton
                    className="rounded-r-md"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Last</span>
                    <ChevronDoubleRightIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </PageButton>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function GlobalFilter({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  // eslint-disable-next-line react/require-default-props
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)
    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="sr-only">Search</label>
      <input
        type="text"
        className="z-0 block w-full rounded-lg border-gray-200 pl-10 text-sm shadow focus:border-green-500 focus:ring-green-500 focus:ring-opacity-75 dark:border-gray-700 dark:bg-gray-800"
        {...props}
        placeholder="Cari file..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  )
}
