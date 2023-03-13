const config = {
  reactStrictMode: true,
  webpack(config) {
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
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = (_phase, defaultConfig) => {
  return withBundleAnalyzer({ ...defaultConfig, ...config });
};
