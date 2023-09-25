/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/danh-muc/:slug',
                destination: '/products?slug=:slug',
            },
            {
                source: '/san-pham/:slug',
                destination: '/product-detail?slug=:slug',
            },
        ];
    },
    images: {
        domains: ['localhost'],
    },
};

module.exports = nextConfig;
