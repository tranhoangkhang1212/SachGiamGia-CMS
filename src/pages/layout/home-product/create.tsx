import Button from '@/components/Button';
import Input from '@/components/Input';
import Loading from '@/components/Loading';
import LoadingOverlay from '@/components/LoadingOverlay';
import SelectV2 from '@/components/NewSelect';
import { IOption } from '@/components/Select';
import { API } from '@/configs/axios';
import { ESidebarOption } from '@/constants/Sidebar.enum';
import { CreateHomeProductRequestDto } from '@/interfaces/request/CreateHomeProductRequestDto';
import { AuthorResponse } from '@/interfaces/response/AuthorsResponseDto';
import { PaginationResponse } from '@/interfaces/response/PaginationResponse';
import { ShortProductResponseDto } from '@/interfaces/response/ProductResponse';
import { executeGetWithPagination, executePostWithBody } from '@/utils/APIUtil';
import { slugGenerate } from '@/utils/CommonUtil';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAsyncRetry } from 'react-use';

const PAGE_SIZE = 5;
const initialRequest = {
    name: '',
    slug: '',
    category: [],
    authors: [],
    distributors: [],
    products: [],
    publishers: [],
    productsShow: [],
};

const CreateSidebar = () => {
    const [options, setOptions] = useState<Record<ESidebarOption, IOption[]>>({
        Author: [],
        Category: [],
        Distributor: [],
        Publisher: [],
        SubMenu: [],
    });
    const [productOptions, setProductOptions] = useState<IOption[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [requestDto, setRequestDto] = useState<CreateHomeProductRequestDto>(initialRequest);
    const [isLoading, setIsLoading] = useState(false);

    const { loading, retry } = useAsyncRetry(async () => {
        const { data }: { data: Record<ESidebarOption, AuthorResponse[]> } = await API.get('/sidebar/options');
        const authorOptions: IOption[] = data.Author.map((value) => ({ label: value.name, value: value.id }));
        const categoryOptions: IOption[] = data.Category.map((value) => ({ label: value.name, value: value.id }));
        const distributorOptions: IOption[] = data.Distributor.map((value) => ({ label: value.name, value: value.id }));
        const publisherOptions: IOption[] = data.Publisher.map((value) => ({ label: value.name, value: value.id }));
        const submenuOptions: IOption[] = data.SubMenu.map((value) => ({ label: value.name, value: value.id }));
        setOptions({
            Author: authorOptions,
            Category: categoryOptions,
            Distributor: distributorOptions,
            Publisher: publisherOptions,
            SubMenu: submenuOptions,
        });
    });
    const { loading: productLoading } = useAsyncRetry(async () => {
        const options = await getProductOptions(pageIndex);
        setProductOptions(options);
    }, []);
    const getProductOptions = async (pageIndex: number): Promise<IOption[]> => {
        const { data }: { data: PaginationResponse<ShortProductResponseDto> } = await executeGetWithPagination(
            '/product/options',
            { page: pageIndex, pageSize: PAGE_SIZE },
        );
        setTotalPage(data.totalPage);
        return data.rows.map((value) => ({ label: value.name, value: value.id }));
    };

    if (loading || productLoading) {
        return <Loading />;
    }

    const handleMoreClick = async () => {
        const options = await getProductOptions(pageIndex + 1);
        setPageIndex(pageIndex + 1);
        return options;
    };

    const handleInputChange = (key: string, value: string) => {
        setRequestDto((prev) => ({ ...prev, [key]: value }));
    };

    const handleNameInputChange = (key: string, name: string) => {
        const slug = slugGenerate(name);
        handleInputChange('name', name);
        handleInputChange('slug', slug);
    };

    const handleSlugChange = (key: string, slug: string) => {
        handleInputChange('slug', slug);
    };

    const handleAuthorChange = (value: string) => {
        if (requestDto.authors.includes(value)) {
            setRequestDto((prev) => ({ ...prev, authors: prev.authors.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, authors: [...prev.authors, value] }));
        }
    };

    const handlePublisherChange = (value: string) => {
        if (requestDto.publishers.includes(value)) {
            setRequestDto((prev) => ({ ...prev, publishers: prev.publishers.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, publishers: [...prev.publishers, value] }));
        }
    };

    const handleDistributorChange = (value: string) => {
        if (requestDto.authors.includes(value)) {
            setRequestDto((prev) => ({ ...prev, distributors: prev.distributors.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, distributors: [...prev.distributors, value] }));
        }
    };

    const handleProductsChange = (value: string) => {
        if (requestDto.products.includes(value)) {
            setRequestDto((prev) => ({ ...prev, products: prev.products.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, products: [...prev.products, value] }));
        }
    };

    const handleShowProductsChange = (value: string) => {
        if (requestDto.productsShow.includes(value)) {
            setRequestDto((prev) => ({ ...prev, productsShow: prev.productsShow.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, productsShow: [...prev.productsShow, value] }));
        }
    };

    const handleCategoryChange = (value: string) => {
        if (requestDto.category.includes(value)) {
            setRequestDto((prev) => ({ ...prev, category: prev.category.filter((e) => e !== value) }));
        } else {
            setRequestDto((prev) => ({ ...prev, category: [...prev.category, value] }));
        }
    };

    const handleCreateSidebar = async () => {
        try {
            setIsLoading(true);
            await executePostWithBody('/layout/home-products', requestDto);
            toast.success(`Tạo menu sản phầm chính ${requestDto.name} thành công`);
            retry();
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="!text-black">
            {isLoading && <LoadingOverlay />}
            <div className="flex justify-end mt-4">
                <Button text="Tạo" className="w-[125px] text-center" onClick={handleCreateSidebar} />
            </div>
            <div className="flex justify-between">
                <Input
                    className="basis-[49%]"
                    label="Tên"
                    name="name"
                    onChange={(key, value) => handleNameInputChange(key, String(value))}
                    variant="border"
                />
                <Input
                    className="basis-[49%]"
                    label="Slug"
                    name="slug"
                    variant="border"
                    value={requestDto.slug}
                    onChange={(key, value) => handleSlugChange(key, String(value))}
                />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <SelectV2
                    className="w-auto"
                    title="Tác giả"
                    options={options[ESidebarOption.Author]}
                    onChange={(value) => handleAuthorChange(String(value))}
                />
                <SelectV2
                    title="Nhà xuất bản"
                    options={options[ESidebarOption.Distributor]}
                    onChange={(value) => handleDistributorChange(String(value))}
                />
                <SelectV2
                    title="Nhà phát hành"
                    options={options[ESidebarOption.Publisher]}
                    onChange={(value) => handlePublisherChange(String(value))}
                />
                <SelectV2
                    title="Thể loại"
                    options={options[ESidebarOption.Category]}
                    onChange={(value) => handleCategoryChange(String(value))}
                />
                <SelectV2
                    title="Sản phẩm"
                    options={productOptions}
                    getNewOption={totalPage > 1 && pageIndex < totalPage ? handleMoreClick : undefined}
                    onChange={(value) => handleProductsChange(String(value))}
                />
                <SelectV2
                    title="Sản phẩm chính"
                    options={productOptions}
                    getNewOption={totalPage > 1 && pageIndex < totalPage ? handleMoreClick : undefined}
                    onChange={(value) => handleShowProductsChange(String(value))}
                />
            </div>
        </div>
    );
};

export default CreateSidebar;
