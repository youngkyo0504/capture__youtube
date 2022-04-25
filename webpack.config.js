const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const childProcess = require("child_process");
module.exports = {
  mode: "development", // 개발 환경이냐 product냐 ,
  // 엔트리는 하나하나의 파일의 시작임 그 시작을 토대로
  entry: {
    main: "./src/app.js", // 시작 엔트리가 app.js입니다.
  },
  output: {
    path: path.resolve("./dist"), // ./dist에 output을 저장하라는 말입니다.
    filename: "[name].js", // 엔트리에서 정해놓은 name이 들어와서
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]", //파일의 이름과 확장자 그리고 해쉬값으로 이름을 만든다.
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: "file-loader",
        type: "javascript/auto",
        options: {
          name: "[name].[ext]", // json 그대로 받아올 때
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
    Build Date :${new Date().toLocaleDateString}
    Commit Version : ${childProcess.execSync("git rev-parse --short Head")} 
    Author :  ${childProcess.execSync("git config user.name")}
    `,
    }),
    new HTMLWebpackPlugin({
      template: "./src/popup.html",
      filename: "popup.html",
      // <h1><%= htmlWebpackPlugin.options.title %></h1> 이런 형태로 삽입 가능
      title:
        process.env.NODE_ENV === "development"
          ? "development"
          : "Youtube Screenshot",

      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
        // template html에 ejs형태로 환경변수를 정의할 수 있다.
      },
      minify:
        process.env.NODE_ENV === "production"
          ? { collapseWhitespace: true, removeComments: true }
          : false,
    }),

    new CleanWebpackPlugin(), // 전에 만들었던 것을 삭제하고 ... 그렇다.
  ],
};
//plugin이 자동으로 output js와 html을 연결시켜준다.
