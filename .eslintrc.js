module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint-config-prettier"], // eslint 와 prettier 겹치는 부분을 끄고 prettier에 위임한다. 
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"], // prettier의 룰을 모두 가져와서 eslint가 prettier의 규칙을 eslint에 넣어 eslint만 작동해도 모두 고쳐진다. 
  ignorePatterns: ["webpack.config.js", ".eslintrc.js","dist"], // eslint적용 안하는 파일들
  rules: {
    "prettier/prettier": "error",
  },
};
