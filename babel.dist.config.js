// 配布用 (dist) のビルド設定。
// --env-name esm  : import/export を残す ES モジュール版 → dist/
// --env-name cjs  : require/exports にする CommonJS 版 → dist/cjs/
//
// テスト (jest) は babel.config.js と .babelrc を使い、この設定は使わない。
module.exports = (api) => {
    const esm = api.env('esm');

    return {
        presets: [
            ['@babel/preset-env', { modules: esm ? false : 'commonjs' }],
            '@babel/preset-react',
        ],
    };
};
