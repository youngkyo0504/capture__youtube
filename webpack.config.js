const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
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
              publicPath: "../dist", // html기준이었다. 그런데 이제 html도 웹팩에서 처리하기 때문에 경로 신경안써도 됩니다.
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./popup.html",
    }),
    new CleanWebpackPlugin(), // 전에 만들었던 것을 삭제하고 ... 그렇다.
  ],
};
//plugin이 자동으로 output js와 html을 연결시켜준다.
