/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'storage.yandexcloud.net',
            pathname: '/donpizza-media/**',
            port: '',
            protocol: 'https',
        }],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '3mb',
        },
    },
};

export default nextConfig;
