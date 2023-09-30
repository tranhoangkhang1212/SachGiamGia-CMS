import Image from '@/components/Image';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Table } from '@/components/Table';
import UploadFile from '@/components/UploadFile';
import { PaginationRequest } from '@/interfaces/request/PaginationRequestDto';
import { ImageResponseDto } from '@/interfaces/response/ImageResponseDto';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { executeGetWithPagination, executePostWithFormData } from '@/utils/APIUtil';
import { formatDateUTC } from '@/utils/DateTimeUtil';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnDef } from '@tanstack/react-table';
import { parse } from 'path';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useCopyToClipboard } from 'react-use';

const PAGE_SIZE = 9;

interface IAuthorCommonProps {}
const AuthorCommon: React.FC<IAuthorCommonProps> = () => {
    const cols = useMemo<ColumnDef<ImageResponseDto>[]>(
        () => [
            {
                header: 'Image',
                cell: (value) => (
                    <div className="flex justify-start">
                        <Image className="max-h-[40px] w-auto object-contain" src={value.getValue() as string} alt="" />
                    </div>
                ),
                accessorKey: 'url',
            },
            {
                header: 'Tên',
                cell: (value) => <>{parse(value.getValue() as string).name}</>,
                accessorKey: 'name',
            },
            {
                header: 'Url',
                cell: (value) => (
                    <div
                        className="max-w-[375px] truncate cursor-pointer"
                        onClick={() => handleCopyData(value.getValue() as string)}
                    >
                        <FontAwesomeIcon icon={faCopy} className="mr-2" size="lg" />
                        <span>{value.getValue() as string}</span>
                    </div>
                ),
                accessorKey: 'url',
            },
            {
                header: 'Thời gian tạo',
                cell: (value) => <>{formatDateUTC(String(value.getValue()))}</>,
                accessorKey: 'createdAt',
            },
            {
                header: '',
                cell: () => <button className="font-semibold hover:scale-110 duration-300">Xóa</button>,
                accessorKey: 'createdAt',
            },
        ],
        [],
    );

    const [totalPage, setTotalPage] = useState(0);
    const [dataRendering, setDataRendering] = useState<ImageResponseDto[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, copyToClipboard] = useCopyToClipboard();

    const fetchData = useCallback(async (pagination: PaginationRequest) => {
        const { data }: { data: PaginationResponse<ImageResponseDto> } = await executeGetWithPagination('resource', {
            page: pagination.page,
            pageSize: PAGE_SIZE,
        });
        setDataRendering(data.rows);
        setTotalPage(data.totalPage);
        setCurrentPage(data.page);
        return { page: data.page, rows: data.rows };
    }, []);

    const handleCopyData = async (url: string) => {
        copyToClipboard(url);
        toast.success(`Copy ${url} successful`);
    };

    const handleFileChange = async (file: File) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            await executePostWithFormData('resource/upload', formData);
            fetchData({ page: currentPage, pageSize: PAGE_SIZE });
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="flex justify-end mb-6">
                <UploadFile handleFileChange={handleFileChange} />
            </div>
            <Table<ImageResponseDto>
                data={dataRendering}
                columns={cols}
                pageSize={PAGE_SIZE}
                pageCount={totalPage}
                fetchData={fetchData}
            />
        </>
    );
};

export default AuthorCommon;
