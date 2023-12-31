import Button from '@/components/Button';
import CreateRecordOverlay from '@/components/CreateRecordOverlay';
import LoadingOverlay from '@/components/LoadingOverlay';
import { Table } from '@/components/Table';
import { CreateAuthorRequestDto } from '@/interfaces/request/CreateAuthorRequestDto';
import { PaginationRequest } from '@/interfaces/request/PaginationRequestDto';
import { AuthorResponse } from '@/interfaces/response/AuthorsResponseDto';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { executeGetWithPagination, executePostWithBody } from '@/utils/APIUtil';
import { formatDateUTC } from '@/utils/DateTimeUtil';
import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useCopyToClipboard, useToggle } from 'react-use';

const PAGE_SIZE = 12;

interface IAuthorCommonProps {
    endPoint: string;
}
const AuthorCommon: React.FC<IAuthorCommonProps> = ({ endPoint }) => {
    const cols = useMemo<ColumnDef<AuthorResponse>[]>(
        () => [
            {
                header: 'ID',
                cell: (value) => (
                    <div className="cursor-pointer" onClick={() => handleCopyData(value.getValue() as string)}>
                        {String(value.getValue())}
                    </div>
                ),
                accessorKey: 'id',
            },
            {
                header: 'Tên',
                accessorKey: 'name',
            },
            {
                header: 'Slug',
                accessorKey: 'slug',
            },
            {
                header: 'Thời gian tạo',
                cell: (value) => <>{formatDateUTC(String(value.getValue()))}</>,
                accessorKey: 'createdAt',
            },
            {
                header: '',
                cell: () => (
                    <>
                        <button className="font-semibold duration-300 hover:scale-110">Xóa</button>
                        <span className="px-4">|</span>
                        <button className="font-semibold duration-300 hover:scale-110">Cập nhật</button>
                    </>
                ),
                accessorKey: 'createdAt',
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [dataRendering, setDataRendering] = useState<AuthorResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [requestData, setRequestData] = useState<CreateAuthorRequestDto>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, copyToClipboard] = useCopyToClipboard();
    const [isShowCreate, toggleCreateOverlay] = useToggle(false);

    const fetchData = useCallback(async (pagination: PaginationRequest) => {
        const { data }: { data: PaginationResponse<AuthorResponse> } = await executeGetWithPagination(endPoint, {
            page: pagination.page,
            pageSize: PAGE_SIZE,
        });
        setDataRendering(data.rows);
        setTotalPage(data.totalPage);
        setCurrentPage(data.page);
        return { page: data.page, rows: data.rows };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInputChange = (name: string, value: string | number) => {
        setRequestData({ name: String(value) });
    };

    const handleCopyData = async (id: string) => {
        copyToClipboard(id);
        toast.success(`Sao chép ${id} thành công`);
    };

    const handleCreateClick = async () => {
        try {
            setIsLoading(true);
            if (!requestData?.name) {
                toast.error('Tên không được để trống!');
                return;
            }
            await executePostWithBody<CreateAuthorRequestDto>(endPoint, requestData);
            toggleCreateOverlay();
            setRequestData(undefined);
            fetchData({ page: currentPage, pageSize: PAGE_SIZE });
            toast.success('Tạo mới thành công');
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        toggleCreateOverlay();
    };

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="flex justify-end mb-4">
                <Button text="Tạo mới" type="create" onClick={toggleCreateOverlay} />
            </div>
            <Table<AuthorResponse>
                data={dataRendering}
                columns={cols}
                pageSize={PAGE_SIZE}
                pageCount={totalPage}
                fetchData={fetchData}
            />
            <CreateRecordOverlay
                isShow={isShowCreate}
                toggle={toggleCreateOverlay}
                handleInputChange={handleInputChange}
                onClick={handleCreateClick}
                onClose={handleClose}
            />
        </>
    );
};

export default AuthorCommon;
