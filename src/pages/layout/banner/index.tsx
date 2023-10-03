import Button from '@/components/Button';
import Image from '@/components/Image';
import LoadingOverlay from '@/components/LoadingOverlay';
import UploadFile from '@/components/UploadFile';
import { API } from '@/configs/axios';
import { BannerResponseDto } from '@/interfaces/response/BannerResponseDto';
import { executeDeleteWithBody, executePutWithBody, executePutWithFormData } from '@/utils/APIUtil';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsyncRetry } from 'react-use';

const Banner = () => {
    const [bannerData, setBannerData] = useState<BannerResponseDto[]>([]);
    const [listSelected, setListSelected] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { retry, loading } = useAsyncRetry(async () => {
        const { data } = await API.get('/layout/banners');
        setBannerData(data);
    });
    if (loading || isLoading) {
        return <LoadingOverlay />;
    }

    const handleDisabled = (url: string) => {
        if (listSelected.includes(url)) {
            setListSelected((prev) => [...prev.filter((e) => e !== url)]);
        } else {
            setListSelected((prev) => [...prev, url]);
        }
    };

    const handleFileChange = async (file: File) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await executePutWithFormData('layout/banners', formData);
            setBannerData(data);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteImages = async () => {
        try {
            setIsLoading(true);
            await executeDeleteWithBody('layout/banners', { urls: listSelected });
            retry();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateBannerStatus = async () => {
        try {
            setIsLoading(true);
            await executePutWithBody('layout/banners/status', { urls: listSelected });
            retry();
            setListSelected([]);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="mr-6">
                <div className="flex items-center justify-end mt-2">
                    <Button variant="white" text="Ẩn" className="mr-2 w-[125px]" onClick={handleUpdateBannerStatus} />
                    <Button variant="white" text="Hiển thị" className="w-[125px]" onClick={handleUpdateBannerStatus} />
                </div>
                <div className="flex items-start justify-end mt-4">
                    <Button variant="delete" text="Xóa" className="mr-2 w-[125px] -mt-2" onClick={handleDeleteImages} />
                    <UploadFile handleFileChange={handleFileChange} />
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4 max-h-[85vh] overflow-y-auto mt-8 pr-2">
                {bannerData.map((banner, index) => (
                    <div
                        key={index}
                        className={clsx('cursor-pointer relative')}
                        onClick={() => handleDisabled(banner.url)}
                    >
                        {banner.url}
                        <Image
                            src={banner.url}
                            alt=""
                            className={clsx('rounded-md', { grayscale: banner.show === false })}
                        />
                        {listSelected.includes(banner.url) && (
                            <div className="absolute inset-0 bg-white opacity-80 flex-center">
                                <FontAwesomeIcon className="absolute text-green-500" icon={faCheck} size="5x" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default Banner;
