module.exports = {
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
