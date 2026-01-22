/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/blog',
    trailingSlash: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'getbasin.app',
            },
            {
                protocol: 'https',
                hostname: 'miro.medium.com',
            },
        ],
    },
};

export default nextConfig;
