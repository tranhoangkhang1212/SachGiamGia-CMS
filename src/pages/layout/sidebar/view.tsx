import { Table } from '@/components/Table';
import { PaginationRequest } from '@/interfaces/request/PaginationRequestDto';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { SidebarPageResponseDto } from '@/interfaces/response/SidebarPageResponseDto';
import { executeGetWithPagination } from '@/utils/APIUtil';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';

const PAGE_SIZE = 12;
const View = () => {
    const cols = useMemo<ColumnDef<SidebarPageResponseDto>[]>(
        () => [
            {
                header: 'Tên',
                accessorKey: 'name',
            },
            {
                header: 'Slug',
                accessorKey: 'slug',
            },
            {
                header: 'Thể loại',
                cell: (value) => {
                    const { category } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {category.map((e) => (
                                <div key={e.id}>{e.name}</div>
                            ))}
                        </div>
                    );
                },
                accessorKey: 'author',
            },
            {
                header: 'Tác giả',
                cell: (value) => {
                    const { author } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {author.map((e) => (
                                <div key={e.id}>{e.name}</div>
                            ))}
                        </div>
                    );
                },
                accessorKey: 'author',
            },
            {
                header: 'Nhà xuất bản',
                cell: (value) => {
                    const { distributor } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {distributor.map((e) => (
                                <div key={e.id}>{e.name}</div>
                            ))}
                        </div>
                    );
                },
                accessorKey: 'distributor',
            },
            {
                header: 'Sản phẩm',
                cell: (value) => {
                    const { products } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {products.map((e) => (
                                <div key={e.id}>{e.name}</div>
                            ))}
                        </div>
                    );
                },
                accessorKey: 'distributor',
            },
            {
                header: 'Danh mục phụ',
                cell: (value) => {
                    const { subMenu } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {subMenu.map((e) => (
                                <div key={e}>{e}</div>
                            ))}
                        </div>
                    );
                },
                accessorKey: 'distributor',
            },
        ],
        [],
    );

    const [dataRendering, setDataRendering] = useState<SidebarPageResponseDto[]>([]);
    const [totalPage, setTotalPage] = useState(0);

    const fetchData = useCallback(async (pagination: PaginationRequest) => {
        const { data }: { data: PaginationResponse<SidebarPageResponseDto> } = await executeGetWithPagination(
            '/sidebar',
            {
                page: pagination.page,
                pageSize: PAGE_SIZE,
            },
        );
        setDataRendering(data.rows);
        setTotalPage(data.totalPage);
        return { page: data.page, rows: data.rows };
    }, []);

    return (
        <div>
            <Table<SidebarPageResponseDto>
                data={dataRendering}
                columns={cols}
                pageSize={PAGE_SIZE}
                pageCount={totalPage}
                fetchData={fetchData}
            />
        </div>
    );
};

export default View;
