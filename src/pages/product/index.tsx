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
                cell: (value) => (
                    <>
                        <button className="font-semibold hover:scale-110 duration-300">Xóa</button>
                        <span className="px-4">|</span>
                        <button className="font-semibold hover:scale-110 duration-300">Cập nhật</button>
                    </>
                ),
                accessorKey: 'createdAt',
            },
        ],
        [],
    );

    const [totalPage, setTotalPage] = useState(0);
    const [dataRendering, setDataRendering] = useState<ProductResponseDto[]>([]);
    const [filterRequest, setFilterRequest] = useState<GetProductRequestDto>({ ids: [], name: '', option: [] });
    const [filterData, setFilterData] = useState<IOptionData[]>([]);

    const [isLoading, setIsLoading] = useState(false);

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
            return { page: data.page, rows: data.rows };
        },
        [filterRequest],
    );

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const handleOptionClick = async (type: EFilterData, title: string, value: string) => {
        // const findDataByType = filterData.find((e) => e.type === type);
        // const findNewDataByType = filterDataOptions.find((e) => e.type === type);
        // if (!findNewDataByType) {
        //     return;
        // }
        // if (findDataByType) {
        //     const oldOption = findDataByType.options.find((e) => e.value === value);
        //     if (oldOption) {
        //         removeElementFromArray(findDataByType.options, oldOption);
        //         setFilterData((prev) => [...prev.filter((e) => e.type !== type), findDataByType]);
        //         return;
        //     }
        //     const label = findNewDataByType.options.find((e) => e.value === value)?.label;
        //     if (label) {
        //         findDataByType.options.push({ label, value });
        //         setFilterData((prev) => [...prev.filter((e) => e.type !== type), findDataByType]);
        //     }
        // } else {
        //     const label = findNewDataByType.options.find((e) => e.value === value)?.label;
        //     if (!label) {
        //         return;
        //     }
        //     const newData: IOptionData = { type, title, options: [{ label, value }] };
        //     setFilterData((prev) => [...prev.filter((e) => e.type !== type), newData]);
        // }
    };

    // const updateFilterData = () => {
    //     const optionsRequest: GetProductOptionRequestDto[] = filterData
    //         .map((e) => {
    //             if (e.options.length > 0) {
    //                 return {
    //                     type: e.type,
    //                     values: e.options.map((v) => v.value),
    //                 };
    //             }
    //         })
    //         .filter((e) => e !== undefined) as GetProductOptionRequestDto[];
    //     setFilterRequest((prev) => ({ ...prev, options: optionsRequest }));
    // };

    const handleCellClick = (data: ProductResponseDto) => {
        console.log(data);
    };

    return (
        <>
            <FilterBar defaultData={filterDataOptions} data={filterData} onChange={handleOptionClick} />
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
