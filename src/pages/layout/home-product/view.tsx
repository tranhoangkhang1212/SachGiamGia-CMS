import TableClientSide from '@/components/TableClientSide';
import { API } from '@/configs/axios';
import { SidebarPageResponseDto } from '@/interfaces/response/SidebarPageResponseDto';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useAsync } from 'react-use';

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
                header: 'Sản phẩm chính',
                cell: (value) => {
                    const { productShow } = value.row.original;
                    return (
                        <div className="max-h-[80px] overflow-y-auto border-[1px] py-2">
                            {productShow.map((e) => (
                                <div key={e.id}>{e.name}</div>
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

    useAsync(async () => {
        const { data }: { data: SidebarPageResponseDto[] } = await API.get('/layout/home-products');
        setDataRendering(data);
    }, []);

    return (
        <div>
            <TableClientSide data={dataRendering} columns={cols} pageSize={PAGE_SIZE} />
        </div>
    );
};

export default View;
