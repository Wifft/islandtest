const path = require('path');

module.exports = {
    'entry': './src/ts/Game.ts',
    'module': {
        'rules': [
            {
                'test': /\.tsx?$/,
                'use': 'ts-loader',
                'exclude': /node_modules/,
            }
        ]
    },
    'resolve': {
        'extensions': ['.tsx', '.ts', '.js'],
    },
    'output': {
        'filename': 'game.js',
        'path': path.resolve(__dirname, 'dist'),
    },
    'mode': 'production'
}
