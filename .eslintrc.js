module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  //extends: ["plugin:vue/essential",  "@vue/prettier"],//简单校验
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"], //强烈校验，推荐使用
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": [0, "windows"], //换行风格
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
