import { PaginationRequest } from '@/interfaces/request/PaginationRequestDto';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Table as CoreTableType } from '@tanstack/table-core';
import clsx from 'clsx';
import { useEffect } from 'react';

interface ReactTableProps<T extends object> {
    data: T[];
    columns: ColumnDef<T>[];
    pageSize: number;
    pageCount: number;
    fetchData: (pagination: PaginationRequest) => void;
    onRowClick?: (data: T) => void;
}

export const Table = <T extends object>(props: ReactTableProps<T>) => {
    const { data, columns, pageSize, pageCount = 0, fetchData, onRowClick } = props;
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount,
        manualPagination: true,
    });

    useEffect(() => {
        if (!fetchData) {
            return;
        }
        fetchData({ page: table.getState().pagination.pageIndex + 1, pageSize });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [table.getState().pagination.pageIndex, fetchData]);

    return (
        <>
            <table className="w-full text-center">
                <thead className="bg-[#34725b]">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-6 py-3 text-white">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={clsx('font-semibold bg-white border-[1px]', {
                                'hover:bg-[#00000019] cursor-pointer': onRowClick,
                            })}
                            onClick={() => onRowClick && onRowClick(row.original)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td className="px-6 py-4 text-[15px] font-normal whitespace-nowrap" key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pageCount > 1 && <Pagination table={table} />}
        </>
    );
};

interface PaginationProps<T> {
    table: CoreTableType<T>;
}

const Pagination = <T extends RowData>(props: PaginationProps<T>) => {
    const { table } = props;

    const updatePageIndex = (pageIndex: number) => {
        table.setPageIndex(pageIndex);
    };

    const handlePreviousPage = () => {
        table.previousPage();
    };

    const handleNextPage = () => {
        table.nextPage();
    };

    const disabledStyle = 'bg-gray-300 bg-opacity-50';
    return (
        <div className="gap-2 mt-4 flex-center">
            <button
                className={clsx('w-8 h-8 border rounded flex-center', { [disabledStyle]: !table.getCanPreviousPage() })}
                onClick={() => updatePageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <FontAwesomeIcon icon={faAnglesLeft} className={clsx({ 'opacity-60': !table.getCanPreviousPage() })} />
            </button>
            <button
                className={clsx('w-8 h-8 p-1 border rounded', { [disabledStyle]: !table.getCanPreviousPage() })}
                onClick={handlePreviousPage}
                disabled={!table.getCanPreviousPage()}
            >
                <FontAwesomeIcon icon={faAngleLeft} className={clsx({ 'opacity-60': !table.getCanPreviousPage() })} />
            </button>
            <button
                className={clsx('w-8 h-8 p-1 border rounded', { [disabledStyle]: !table.getCanNextPage() })}
                onClick={handleNextPage}
                disabled={!table.getCanNextPage()}
            >
                <FontAwesomeIcon icon={faAngleRight} className={clsx({ 'opacity-60': !table.getCanNextPage() })} />
            </button>
            <button
                className={clsx('w-8 h-8 p-1 border rounded', { [disabledStyle]: !table.getCanNextPage() })}
                onClick={() => updatePageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <FontAwesomeIcon icon={faAnglesRight} className={clsx({ 'opacity-60': !table.getCanNextPage() })} />
            </button>
            <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </strong>
            </span>
            <span className="flex items-center gap-1">
                | Go to page:
                <input
                    type="number"
                    min={1}
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={(e) => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        table.setPageIndex(page);
                    }}
                    className="w-16 p-1 border rounded"
                />
            </span>
        </div>
    );
};
