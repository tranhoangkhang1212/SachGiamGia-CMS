import LoadingOverlay from '@/components/LoadingOverlay';
import { IOption } from '@/components/Select';
import { Table } from '@/components/Table';
import { EFilterData } from '@/constants/FilterData.enum';
import { GetProductOptionRequestDto, GetProductRequestDto } from '@/interfaces/request/GetProductRequestDto';
import { PaginationRequest } from '@/interfaces/request/PaginationRequestDto';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { ProductResponseDto } from '@/interfaces/response/ProductResponse';
import { executeGetWithPagination } from '@/utils/APIUtil';
import { removeElementFromArray } from '@/utils/CommonUtil';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import FilterBar from './filter-bar';
import toast from 'react-hot-toast';
import { API } from '@/configs/axios';
import ConfirmDelete from '@/components/ConfirmDelete';
import { useToggle } from 'react-use';
import Link from 'next/link';

export interface IOptionData {
    title: string;
    type: EFilterData;
    options: IOption[];
}

const options: IOption[] = [
    { label: 'Trần Khang', value: '124wefw' },
    { label: 'Trần Khang 1', value: 'odfgdfg' },
    { label: 'Trần Khang 2', value: '32fsdf' },
    { label: 'Trần Khang 3', value: '35fdfdfg' },
    { label: 'Trần Khang 4', value: '234sf44' },
];

const filterDataOptions: IOptionData[] = [
    {
        title: 'Tác giả',
        type: EFilterData.Author,
        options,
    },
    {
        title: 'Nhà phát hành',
        type: EFilterData.Publisher,
        options,
    },
    {
        title: 'Nhà xuất bản',
        type: EFilterData.Distributor,
        options,
    },
];

const PAGE_SIZE = 10;
const Product = () => {
    const cols = useMemo<ColumnDef<ProductResponseDto>[]>(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
            },
            {
                header: 'Tên',
                accessorKey: 'name',
            },
            {
                header: 'Tác giả',
                cell: (value) => <>{value.renderValue()}</>,
                accessorFn: (value) => <>{value.author.name}</>,
            },
            {
                header: 'Nhà xuất bản',
                cell: (value) => <>{value.renderValue()}</>,
                accessorFn: (value) => <>{value.distributor.name}</>,
            },
            {
                header: 'Nhà phát hành',
                cell: (value) => <>{value.renderValue()}</>,
                accessorFn: (value) => <>{value.publisher.name}</>,
            },
            {
                header: '',
                cell: (value) => {
                    const { id, name } = value.row.original;
                    return (
                        <>
                            <button
                                className="font-semibold duration-300 hover:scale-110"
                                onClick={() => handleDeleteProduct(id, name)}
                            >
                                Xóa
                            </button>
                            <span className="px-4">|</span>
                            <button className="font-semibold duration-300 hover:scale-110">
                                <Link
                                    href={{
                                        pathname: '/product/update',
                                        query: { id },
                                    }}
                                >
                                    Cập nhật
                                </Link>
                            </button>
                        </>
                    );
                },
                accessorKey: 'createdAt',
            },
        ],
        [],
    );

    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [dataRendering, setDataRendering] = useState<ProductResponseDto[]>([]);
    const [filterRequest, setFilterRequest] = useState<GetProductRequestDto>({ ids: [], name: '', option: [] });
    const [filterData, setFilterData] = useState<IOptionData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState({ id: '', name: '' });

    const [isShowConfirmDelete, toggleConfirmDelete] = useToggle(false);

    const fetchData = useCallback(
        async (pagination: PaginationRequest) => {
            const { data }: { data: PaginationResponse<ProductResponseDto> } = await executeGetWithPagination(
                '/product',
                {
                    page: pagination.page,
                    pageSize: PAGE_SIZE,
                },
                { ...filterRequest },
            );
            setDataRendering(data.rows);
            setTotalPage(data.totalPage);
            setPageIndex(pagination.page);
            return { page: data.page, rows: data.rows };
        },
        [filterRequest],
    );

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const handleCellClick = (data: ProductResponseDto) => {
        console.log(data);
    };

    const handleDeleteProduct = async (id: string, name: string) => {
        setDeleteInfo({ id, name });
        toggleConfirmDelete();
    };

    const handleConfirmDelete = async () => {
        try {
            setIsLoading(true);
            await API.delete('/product', { params: { id: deleteInfo.id } });
            toast.success(`Xóa sản phẩm ${deleteInfo.name} thành công`);
            fetchData({ page: pageIndex, pageSize: PAGE_SIZE });
            toggleConfirmDelete();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* <FilterBar defaultData={filterDataOptions} data={filterData} onChange={handleOptionClick} /> */}
            {isShowConfirmDelete && <ConfirmDelete onDestroy={toggleConfirmDelete} onConfirm={handleConfirmDelete} />}
            <Table<ProductResponseDto>
                data={dataRendering}
                columns={cols}
                pageSize={PAGE_SIZE}
                pageCount={totalPage}
                fetchData={fetchData}
                onRowClick={handleCellClick}
            />
        </>
    );
};

export default Product;
