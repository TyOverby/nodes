module.exports = w => {
    return {
        env: {
            type: "node",
        },
        files: [
            "src/**/*.ts*",
        ],
        tests: [
            "test/**/*.ts*",
        ],
        debug: true,
        testFramework: 'mocha',
        compilers: {
            '**/*.ts': w.compilers.typeScript({ module: 'commonjs' })
        }
    };
};
