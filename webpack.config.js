// Copyright 2020 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: {
        'djs-verifier': './src/djs-verifier.js',
        'qjs-verifier': './src/qjs-verifier.js',
        'node-verifier': './src/node-verifier.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'fs', 'bin'),
        filename: '[name]-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
