module.exports = {
  roots: [
    "./test", // jest 扫描的目录
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest", // 哪些文件需要用 ts-jest 执行
  },
  testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.ts?$",
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  globals: {
    "ts-jest": {
      tsConfig: 'tsconfig.json',
    },
  },
};
