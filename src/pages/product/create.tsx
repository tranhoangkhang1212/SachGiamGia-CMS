import Button from '@/components/Button';
import LoadingOverlay from '@/components/LoadingOverlay';
import UploadFile from '@/components/UploadFile';
import { IBaseAppProps } from '@/interfaces/Props';
import { CreateProductRequestDto } from '@/interfaces/request/CreateProductRequestDto';
import { executePostWithBody } from '@/utils/APIUtil';
import { getJsonFromCsv } from '@/utils/FileUIploadUtils';
import clsx from 'clsx';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateProduct = () => {
    const [products, setProducts] = useState<CreateProductRequestDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileProductRequestChange = async (file: File) => {
        const products = (await getJsonFromCsv(file)) as CreateProductRequestDto[];
        const newResult = products.map((product) => {
            product.images = [];
            return product;
        });
        setProducts(newResult);
    };

    const handleImagesFileChange = async (file: File) => {
        const images = await getJsonFromCsv(file);
        setProducts((prev) => [
            ...prev.map((product, index) => {
                const image = images[index] as unknown as string;
                product.images.push(...Object.values(image));
                return product;
            }),
        ]);
    };

    const handleStatisticFileChange = async (file: File) => {
        const statistics = await getJsonFromCsv(file);
        setProducts((prev) => [
            ...prev.map((product, index) => {
                const statistic = statistics[index] as unknown as string;
                product.statistics = JSON.stringify(statistic);
                return product;
            }),
        ]);
    };

    const handleCreateNewProducts = async () => {
        try {
            setIsLoading(true);
            await executePostWithBody('/product/create-multiple', { products });
            toast.success(`Create ${products.length} successful`);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <div className="flex flex-wrap justify-between">
                <ContentWrapper className="basis-[49%] flex flex-wrap">
                    <div className="basis-1/2">
                        <span className="block mb-2">Thông tin cơ bản</span>
                        <UploadFile handleFileChange={handleFileProductRequestChange} />
                    </div>
                    <div className="basis-1/2">
                        <span className="block mb-2">Chọn file hình ảnh</span>
                        <UploadFile handleFileChange={handleImagesFileChange} />
                    </div>
                    <div className="mt-4 basis-1/2">
                        <span className="block mb-2">Thông số</span>
                        <UploadFile handleFileChange={handleStatisticFileChange} />
                    </div>
                    <div className="mt-4 basis-1/2">
                        <span className="invisible block mb-2">hidden</span>
                        <Button className="text-center w-[125px]" text="Tạo" onClick={handleCreateNewProducts} />
                    </div>
                </ContentWrapper>
            </div>
        </>
    );
};

interface IContentWrapperProps extends IBaseAppProps {}

const ContentWrapper: React.FC<IContentWrapperProps> = (props) => {
    const { children, className } = props;
    return (
        <div className={clsx('border-[1px] w-full h-full mb-6 p-4 rounded border-primary', className)}>{children}</div>
    );
};

export default CreateProduct;
