const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    // config.optimization = {
    //   ...config.optimization,
    //   usedExports: true,
    //   sideEffects: true,
    //   innerGraph: true,
    // };

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.module.rules.push({
      test: /\.(glsl|vs|fs)$/,
      type: "asset/source",
    });

    return config;
  },
  images: {
    domains: ["s3.amazonaws.com"],
  },
});
