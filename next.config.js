const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

const removeImports = require('next-remove-imports')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'avatars.githubusercontent.com',
      'source.boringavatars.com',
      'lh3.googleusercontent.com',
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

module.exports = withVanillaExtract(removeImports({ ...nextConfig }));
