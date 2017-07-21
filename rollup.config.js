import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
// import uglify from 'rollup-plugin-uglify'

export default {
    entry: 'src/paginator.js',
    dest: 'dist/paginator.js', // equivalent to --output
    format: 'umd',
    moduleName: 'Paginator',
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        babel({
            exclude: ['node_modules/**','./src/katex.min.js'],
        }),
        // uglify(),   // 加入压缩代码
        commonjs()
    ]
}