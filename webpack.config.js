// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");


const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./src/tg/tgInit.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      '@db': path.resolve(__dirname, 'src/db'),
      '@parse': path.resolve(__dirname, 'src/parse'),
      '@shared': path.resolve(__dirname, 'src/parse'),
      '@api': path.resolve(__dirname, 'src/api'),
      "@controllers": path.resolve(__dirname, 'src/controllers'),
      "@tg": path.resolve(__dirname, 'src/tg'),
      "@utils": path.resolve(__dirname, 'src/utils'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
