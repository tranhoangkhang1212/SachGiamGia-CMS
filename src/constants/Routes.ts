export const RouteNotLayout = ['/login', '/404'];
export const RouteTopComponentSpecial = [];

export interface BaseSidebarRoutes {
    title: string;
    path: string;
}

export interface SidebarSubRoute extends BaseSidebarRoutes {
    subRoutes?: BaseSidebarRoutes[];
}

export const SidebarRoutes: SidebarSubRoute[] = [
    {
        title: 'Sản phẩm',
        path: '/',
        subRoutes: [
            { title: 'Tác giả', path: '/author' },
            { title: 'Thể loại', path: '/category' },
            { title: 'Nhà xuất bản', path: '/distributor' },
            { title: 'Nhà phát hành', path: '/publisher' },
            { title: 'Tất cả sản phẩm', path: '/product' },
            { title: 'Tạo sản phẩm', path: '/product/create' },
        ],
    },
    { title: 'Giao diện', path: '/gg', subRoutes: [] },
];
