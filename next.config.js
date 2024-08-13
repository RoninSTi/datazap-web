/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: `${process.env.S3_UPLOAD_BUCKET}.s3.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: `${process.env.S3_UPLOAD_BUCKET}.s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: `datazap-images.s3.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: `datazap-images.s3.us-east-2.amazonaws.com`,
      },
      {
        protocol: 'https',
        hostname: 'datazap-uploads.s3.us-east-2.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
