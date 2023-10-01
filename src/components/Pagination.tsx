import { IBaseAppProps } from '@/interfaces/CommonProps';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps extends IBaseAppProps {
    pageSize: number;
    totalElement: number;
    onPaginationChange: (pageIndex: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { className, pageSize, totalElement, onPaginationChange } = props;

    const totalPage = Math.ceil(totalElement / pageSize);

    if (totalPage <= 1) {
        return <></>;
    }

    return (
        <div className={clsx('flex-center', className)}>
            <ReactPaginate
                breakLabel="..."
                onPageChange={(page) => onPaginationChange(page.selected + 1)}
                pageRangeDisplayed={pageSize}
                pageCount={totalPage}
                previousLabel={<PaginationButton icon={faChevronLeft} />}
                nextLabel={<PaginationButton icon={faChevronRight} />}
                renderOnZeroPageCount={null}
                pageLinkClassName="mx-[5px] text-[15px] border-[1px] pt-1 w-8 h-8 block flex-center rounded-md"
                containerClassName="flex items-center"
                activeLinkClassName="bg-primary bg-opacity-60 border-primary font-semibold"
            />
        </div>
    );
};

interface PaginationButtonProps {
    icon: IconProp;
}

const PaginationButton: React.FC<PaginationButtonProps> = (props) => {
    const { icon } = props;
    return (
        <div className="border-[1px] w-8 h-8 flex-center rounded-md">
            <FontAwesomeIcon icon={icon} size="xs" />
        </div>
    );
};

export default Pagination;
