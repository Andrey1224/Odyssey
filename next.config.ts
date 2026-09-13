import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'odyssey-navy-theta.vercel.app' }],
        destination: 'https://odysseybaths.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.odysseybaths.co.uk' }],
        destination: 'https://odysseybaths.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'odyssey-alpha-eosin.vercel.app' }],
        destination: 'https://odysseybaths.co.uk/:path*',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/product-category/walk-in-baths',
        destination: '/walk-in-baths',
        permanent: true,
      },
      {
        source: '/product-category/deep-soaker-bath',
        destination: '/deep-soaker-baths',
        permanent: true,
      },
      {
        source: '/product-category/walk-in-shower-baths',
        destination: '/walk-in-shower-baths',
        permanent: true,
      },
      {
        source: '/product-category/standard-size-baths',
        destination: '/standard-size-baths',
        permanent: true,
      },
      {
        source: '/product/carnelian-curvy-and-stunning-p-shaped-bath',
        destination: '/walk-in-shower-baths/carnelian',
        permanent: true,
      },
      {
        source: '/product/highgrove-a-beautiful-l-shaped-bath',
        destination: '/walk-in-shower-baths/highgrove',
        permanent: true,
      },
      {
        source: '/product/larimar-the-perfect-l-shaped-bath',
        destination: '/walk-in-shower-baths/larimar',
        permanent: true,
      },
      {
        source: '/product/olivia-available-in-a-larger-size',
        destination: '/walk-in-shower-baths/olivia',
        permanent: true,
      },
      {
        source: '/product/abalone-1500-and-1700-with-glass-door',
        destination: '/standard-size-baths/abalone-1500-1700-glass',
        permanent: true,
      },
      {
        source: '/product/abalone-rv-1500-and-1700-with-glass-door',
        destination: '/standard-size-baths/abalone-rv-1500-1700-glass',
        permanent: true,
      },
      {
        source: '/product/avrail-solid-performer-1500-and-1700-with-plastic-door',
        destination: '/standard-size-baths/avrail-1500-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/cordova-double-ended-1700-with-plastic-door',
        destination: '/standard-size-baths/cordova-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/cortega-double-ended-1700-with-glass-door',
        destination: '/standard-size-baths/cortega-1700-glass',
        permanent: true,
      },
      {
        source: '/product/aventis-the-family-favourite-1700',
        destination: '/standard-size-baths/aventis-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/affinity-attractive-bifold-door-design',
        destination: '/deep-soaker-baths/affinity',
        permanent: true,
      },
      {
        source: '/product/priya-a-modern-and-luxurious-bath',
        destination: '/deep-soaker-baths/priya',
        permanent: true,
      },
      {
        source: '/product/caversham-an-absolute-sublime-all-rounder',
        destination: '/deep-soaker-baths/caversham',
        permanent: true,
      },
      {
        source: '/product/maestro-unique-bi-folding-door-and-easy-to-clean',
        destination: '/deep-soaker-baths/maestro',
        permanent: true,
      },
      {
        source: '/product/serenity-66-classic-one-of-our-bestsellers',
        destination: '/walk-in-baths/serenity-66-classic',
        permanent: true,
      },
      {
        source: '/product/serenity-66-plus-ease-your-muscles-with-water-jets',
        destination: '/walk-in-baths/serenity-66-plus',
        permanent: true,
      },
      {
        source: '/product/serenity-66-special-luxury-featuress-and-fully-loaded',
        destination: '/walk-in-baths/serenity-66-special',
        permanent: true,
      },
      {
        source: '/product/serenity-66-special',
        destination: '/walk-in-baths/serenity-66-special',
        permanent: true,
      },
      {
        source: '/product/serenity-75-classic-styling-and-built-to-last',
        destination: '/walk-in-baths/serenity-75-classic',
        permanent: true,
      },
      {
        source: '/product/serenity-75-plus-large-walk-in-bath-with-water-jets',
        destination: '/walk-in-baths/serenity-75-plus',
        permanent: true,
      },
      {
        source: '/product/stamford-75-classic-a-robust-inswing',
        destination: '/walk-in-baths/stamford-75-classic',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/returns-policy',
        destination: '/return-policy',
        permanent: true,
      },
      {
        source: '/product-category/serenity-range',
        destination: '/walk-in-baths',
        permanent: true,
      },
      {
        source: '/product-category/shower-baths',
        destination: '/walk-in-shower-baths',
        permanent: true,
      },
      {
        source: '/product/affinity',
        destination: '/deep-soaker-baths/affinity',
        permanent: true,
      },
      {
        source: '/product/ambiance',
        destination: '/deep-soaker-baths/ambiance',
        permanent: true,
      },
      {
        source: '/product/ambiance-the-king-of-front-entry-baths',
        destination: '/deep-soaker-baths/ambiance',
        permanent: true,
      },
      {
        source: '/product/athena',
        destination: '/deep-soaker-baths/athena',
        permanent: true,
      },
      {
        source: '/product/aventis-1700',
        destination: '/standard-size-baths/aventis-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/avrail-1500-and-1700-with-plastic-door',
        destination: '/standard-size-baths/avrail-1500-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/avrail-rv-1500-and-1700-with-plastic-door',
        destination: '/standard-size-baths/avrail-rv-1500-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/carnelian',
        destination: '/walk-in-shower-baths/carnelian',
        permanent: true,
      },
      {
        source: '/product/caversham',
        destination: '/deep-soaker-baths/caversham',
        permanent: true,
      },
      {
        source: '/product/cordova-1700-with-plastic-door',
        destination: '/standard-size-baths/cordova-1700-plastic',
        permanent: true,
      },
      {
        source: '/product/cortega-1700-with-glass-door',
        destination: '/standard-size-baths/cortega-1700-glass',
        permanent: true,
      },
      {
        source: '/product/highgrove',
        destination: '/walk-in-shower-baths/highgrove',
        permanent: true,
      },
      {
        source: '/product/larimar',
        destination: '/walk-in-shower-baths/larimar',
        permanent: true,
      },
      {
        source: '/product/maestro',
        destination: '/deep-soaker-baths/maestro',
        permanent: true,
      },
      {
        source: '/product/olivia',
        destination: '/walk-in-shower-baths/olivia',
        permanent: true,
      },
      {
        source: '/product/priya',
        destination: '/deep-soaker-baths/priya',
        permanent: true,
      },
      {
        source: '/product/serenity-66-classic',
        destination: '/walk-in-baths/serenity-66-classic',
        permanent: true,
      },
      {
        source: '/product/serenity-66-plus',
        destination: '/walk-in-baths/serenity-66-plus',
        permanent: true,
      },
      {
        source: '/product/serenity-75-classic',
        destination: '/walk-in-baths/serenity-75-classic',
        permanent: true,
      },
      {
        source: '/product/serenity-75-plus',
        destination: '/walk-in-baths/serenity-75-plus',
        permanent: true,
      },
      {
        source: '/product/serenity-75-special',
        destination: '/walk-in-baths/serenity-75-special',
        permanent: true,
      },
      {
        source: '/product/serenity-75-special-large-and-fully-featured',
        destination: '/walk-in-baths/serenity-75-special',
        permanent: true,
      },
      {
        source: '/product/stamford-75-classic',
        destination: '/walk-in-baths/stamford-75-classic',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
