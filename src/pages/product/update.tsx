import Button from '@/components/Button';
import Image from '@/components/Image';
import Input from '@/components/Input';
import LoadingOverlay from '@/components/LoadingOverlay';
import TextEditor from '@/components/TextEditor';
import { API } from '@/configs/axios';
import { IProductDetail, defaultProductDetail } from '@/interfaces/Product';
import { ContextWithParams } from '@/interfaces/QueryParams';
import { executePutWithBody, executePutWithFormData } from '@/utils/APIUtil';
import { priceFormat } from '@/utils/CommonUtil';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

interface IUpdateProductProps {
    id: string;
}

const UpdateProduct: React.FC<IUpdateProductProps> = (props) => {
    const { id } = props;
    const [productData, setProductData] = useState<IProductDetail>(defaultProductDetail);
    const [isLoading, setLoading] = useState(false);
    const [description, setDescription] = useState('');

    useAsync(async () => {
        const { data } = await API.get(`/product/detail/${id}`);
        setProductData(data);
    }, [id]);

    const handleDescriptionChange = (value: string) => {
        setProductData((prev) => ({ ...prev, description: value }));
    };

    const handleUpdateProduct = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify(productData)]));
            await executePutWithFormData('/product', formData);
            toast.success('Cập nhật sản phẩm thành công');
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useAsync(async () => {
        const response = await fetch('http://localhost:9000/sach-giam-gia/truyen-tranh-00041696076290279.json');
        const text = await response.text();
        setDescription(text);
    });

    return (
        <div className="h-[90vh] overflow-y-auto pb-4 px-4">
            {isLoading && <LoadingOverlay />}
            <div className="flex justify-between">
                <Input
                    disabled
                    className="basis-[32%]"
                    label="ID"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.id}
                />
                <Input
                    className="basis-[32%]"
                    label="Tên"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.name}
                />
                <Input
                    className="basis-[32%]"
                    label="Slug"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.slug}
                />
            </div>
            <div className="flex flex-wrap justify-between mt-4">
                <Input
                    className="basis-[32%]"
                    label="Danh mục"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.category.name}
                />
                <Input
                    className="basis-[32%]"
                    label="Tác giả"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.author.name}
                />
                <Input
                    className="basis-[32%]"
                    label="Nhà xuất bản"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.distributor.name}
                />
                <Input
                    className="basis-[32%] mt-4"
                    label="Nhà phát hành"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.publisher.name}
                />
            </div>
            <div className="flex justify-between mt-4">
                <Input
                    className="basis-[32%]"
                    label="Giá"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={priceFormat(productData.price)}
                />
                <Input
                    className="basis-[32%]"
                    label="Giảm giá"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={productData.saleOff + '%'}
                />
                <Input
                    className="basis-[32%]"
                    label="Giá cuối"
                    name="name"
                    onChange={() => {}}
                    variant="border"
                    value={priceFormat(productData.finalPrice)}
                />
            </div>
            <div className="mt-4 ">
                <span>Hình ảnh</span>
                <div className="flex">
                    {productData?.images.map((image, index) => (
                        <div key={index} className="mr-4 ">
                            <Image className="!h-[120px] w-auto rounded-[4px]" src={image.url} alt="" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4">
                <span>Mô tả</span>
                <TextEditor onChange={handleDescriptionChange} defaultValue={description} />
            </div>
            <div className="fixed right-5 bottom-5 z-[99]">
                <Button text="Save" onClick={handleUpdateProduct} />
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: ContextWithParams) => {
    const { query } = context;
    const id = query.id;
    return {
        props: {
            id,
        },
    };
};

export default UpdateProduct;
