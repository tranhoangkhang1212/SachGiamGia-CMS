import { ESidebarOption } from '@/constants/Sidebar.enum';
import { AuthorResponse } from './AuthorsResponseDto';
import { ShortProductResponseDto } from './ProductResponse';

export interface SidebarPageResponseDto {
    name: string;
    slug: string;
    subMenu: string[];
    distributor: AuthorResponse[];
    author: AuthorResponse[];
    publisher: AuthorResponse[];
    category: AuthorResponse[];
    products: ShortProductResponseDto[];
    productShow: ShortProductResponseDto[];
    type: ESidebarOption;
}

export interface SidebarOptionsResponseDto {
    type: ESidebarOption;
    values: AuthorResponse[];
}
