const { override, addWebpackAlias, addBabelPreset, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        'react-refresh/runtime': path.resolve(
            path.join(__dirname, '..', 'node_modules', 'react-refresh', 'runtime.js')
        )
    }),
    addBabelPreset(['@babel/preset-react', { runtime: 'automatic' }]),
    addBabelPreset('@babel/preset-typescript'),
    addWebpackModuleRule({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', { runtime: 'automatic' }],
                        '@babel/preset-typescript'
                    ],
                },
            },
        ],
    })
);
