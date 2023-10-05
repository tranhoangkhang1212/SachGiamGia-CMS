import Button from '@/components/Button';
import Input from '@/components/Input';
import LoadingOverlay from '@/components/LoadingOverlay';
import { API } from '@/configs/axios';
import { UpdateBaseLayoutRequestDto } from '@/interfaces/request/UpdateBaseLayoutRequestDto';
import { BaseLayoutResponseDto } from '@/interfaces/response/BaseLayoutResponseDto';
import { executePutWithBody } from '@/utils/APIUtil';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsync } from 'react-use';

const BaseLayout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [requestDto, setRequestDto] = useState<UpdateBaseLayoutRequestDto>({});

    useAsync(async () => {
        const { data }: { data: BaseLayoutResponseDto } = await API.get('layout/base-layout');
        setRequestDto(data);
    });

    const handleInputChange = (name: string, value: string | number) => {
        setRequestDto((prev) => ({ ...prev, [name]: String(value) }));
    };

    const handleUpdateBaseLayout = async () => {
        try {
            setIsLoading(true);
            await executePutWithBody('/layout/base-layout', requestDto);
            toast.success('Cập nhật giao diện thành công');
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="!text-black">
            {isLoading && <LoadingOverlay />}
            <div className="flex justify-end mb-4">
                <Button text="Cập nhật" onClick={handleUpdateBaseLayout} />
            </div>
            <div className="flex justify-between">
                <Input
                    className="basis-[33%]"
                    variant="border"
                    label="Số điện thoại"
                    name="phone"
                    value={requestDto?.phone}
                    onChange={handleInputChange}
                />
                <Input
                    className="basis-[33%]"
                    variant="border"
                    label="Email"
                    name="email"
                    value={requestDto?.email}
                    onChange={handleInputChange}
                />
                <Input
                    className="basis-[33%]"
                    variant="border"
                    label="Địa chỉ"
                    name="address"
                    value={requestDto?.address}
                    onChange={handleInputChange}
                />
            </div>
            {/* <div className="mt-4">
                <h3>Footer</h3>
                <div className="flex justify-between border-[1px] p-4 rounded">
                    <div className="basis-[49%] w-full">
                        <h3 className="font-bold">Danh mục hướng dẫn</h3>
                    </div>
                    <div className="bg-gray-300 w-[2px]" />
                    <div className="basis-[49%] w-full">
                        <h3 className="font-bold">Danh mục chính sách</h3>
                        <div className="flex justify-between">
                            <Input
                                className="basis-[49%]"
                                variant="border"
                                label="Tên"
                                name="name"
                                onChange={() => {}}
                            />
                            <Input
                                className="basis-[49%]"
                                variant="border"
                                label="Đường dẫn"
                                name="url"
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

// interface AddMoreProps {
//     handleChange: (name: string, url: string) => void;
// }

// const AddMore: React.FC<AddMoreProps> = (props) => {
//     const { handleChange } = props;

//     const [name, setName] = useState('');
//     const [url, setUrl] = useState('');

//     const handleNameChange = (_: string, value: string | number) => {
//         const name = String(value);
//         handleChange(name, url);
//         setName(name);
//     };

//     const handleUrlChange = (_: string, value: string | number) => {
//         const url = String(value);
//         handleChange(name, url);
//         setUrl(url);
//     };

//     return (
//         <>
//             <div className="flex justify-between">
//                 <Input className="basis-[49%]" variant="border" label="Tên" name="name" onChange={handleNameChange} />
//                 <Input
//                     className="basis-[49%]"
//                     variant="border"
//                     label="Đường dẫn"
//                     name="url"
//                     onChange={handleUrlChange}
//                 />
//             </div>
//             <button className="border-2 w-[35px] h-[35px] border-black rounded mt-2">
//                 <FontAwesomeIcon icon={faPlus} />
//             </button>
//         </>
//     );
// };

export default BaseLayout;
