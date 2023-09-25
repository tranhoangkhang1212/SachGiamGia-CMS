import { IBaseAppProps } from '@/interfaces/Props';
import clsx from 'clsx';
import React from 'react';

const CreateProduct = () => {
    return (
        <div>
            <div className="flex justify-between flex-wrap">
                <ContentWrapper className="basis-[49%]">
                    <div>ddd</div>
                </ContentWrapper>
                <ContentWrapper className="basis-[49%]">
                    <div>ddd</div>
                </ContentWrapper>
                <ContentWrapper className="basis-[49%]">
                    <div>ddd</div>
                </ContentWrapper>
                <ContentWrapper className="basis-[49%]">
                    <div>ddd</div>
                </ContentWrapper>
            </div>
        </div>
    );
};

interface IContentWrapperProps extends IBaseAppProps {}

const ContentWrapper: React.FC<IContentWrapperProps> = (props) => {
    const { children, className } = props;
    return <div className={clsx('border-[1px] w-full h-full mb-6 p-4 rounded', className)}>{children}</div>;
};

export default CreateProduct;
