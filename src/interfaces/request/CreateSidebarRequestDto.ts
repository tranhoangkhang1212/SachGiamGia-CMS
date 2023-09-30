import { ESidebarType } from '@/constants/Sidebar.enum';

export interface CreateSidebarRequestDto {
    name: string;
    slug: string;
    category: string[];
    products: string[];
    authors: string[];
    publishers: string[];
    distributors: string[];
    subMenu: string[];
    type: ESidebarType;
}
