/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.shahramabdoli.ir',
        port: '',
        pathname: '/static_media/media/pic/**',
      },
    ],
  },
  transpilePackages: [ '@ant-design', 'rc-util', 'rc-pagination', 'rc-picker']
};

export default nextConfig;
