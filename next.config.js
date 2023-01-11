/** @type {import('next').NextConfig} */
//Add cloudflare to display images from this domain
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cloudflare-ipfs.com', 'localhost'],
  },
};
