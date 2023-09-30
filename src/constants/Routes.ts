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
        path: '/product',
        subRoutes: [
            { title: 'Tác giả', path: '/author' },
            { title: 'Thể loại', path: '/category' },
            { title: 'Nhà xuất bản', path: '/distributor' },
            { title: 'Nhà phát hành', path: '/publisher' },
            { title: 'Tất cả sản phẩm', path: '/product' },
            { title: 'Tạo sản phẩm', path: '/product/create' },
        ],
    },
    {
        title: 'Giao diện',
        path: '/sidebar',
        subRoutes: [
            { title: 'Banner', path: '/layout/banner' },
            { title: 'Sidebar', path: '/layout/sidebar' },
            { title: 'Sản phẩm chính', path: '/layout/home-product' },
        ],
    },
    { title: 'Tài nguyên', path: '/resource', subRoutes: [{ title: 'Hình ảnh', path: '/resource' }] },
];
