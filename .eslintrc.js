module.exports = {
    /**
   * 默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录。
   * 为了将ESLint限制在一个特定的项目，设置root: true；
   * ESLint一旦发现配置文件中有 root: true，就会停止在父级目录中寻找。
   */
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 6,
        sourceType: "module",
        allowImportExportEverywhere: true
    },
    globals: {},
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    plugins: [],
    extends: [
        "eslint:recommended", // 有声明变量未使用会报错
        "prettier"
    ],
    /*
        每个规则有3个错误级别：
        off 或 0 : 关闭该规则
        warn 或 1 : 开启规则，使用警告级别的错误，不会导致程序退出
        error 或 2 : 开启规则，使用错误级别的错误，被处罚时程序会退出
    */
    rules: {
        // 强制"for"循环中更新子句的计算器朝着正确的方向移动
        "for-direction": 2,
        // 禁止function定义中出现重名参数
        "no-dupe-args": 2,
        // 禁止对象字面量中出现重复的key
        "no-dupe-keys": 2,
        // 禁止出现重复的case标签
        "no-duplicate-case": 2,
        // 禁用 console
        "no-console": 0,
        // "no-unused-vars": ['off', {"args": "none", "vars": "local"}],
        "no-unused-vars": 0,
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error': 'off'
        // ...
    }
}