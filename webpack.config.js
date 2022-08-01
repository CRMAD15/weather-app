const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const rulesForJavaScript = {
    test: /\.js$/,  //Son los archivos que no entiende webpack por lo que los archivos que con esa ext los tenemos que pasar por algo
    loader: 'babel-loader',  // Es el cargardor que es que estamos usando
    options: {  // son la configuraciones de Babel ya no es ni webpack
        presets: [
            [
                '@babel/preset-react', //configuracion preestablecida que hará todas las configuraciones necesarias a nuetro archivo para   convertirlo en js normal.
                {
                    runtime: 'automatic'
                }
            ]
        ]
    }
}
const rulesForStyles = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']  //Lo mismo que antes pero para que pueda leer los styles, el segundo es es para que entiende que si hay una URL de imagen la entienda que la tenemos en nuestro directorio, el primero es para que entienda css
}
const rules = [rulesForJavaScript, rulesForStyles]

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build')  //nombre de la carpeta y ruta absoluta donde se hara el webpack
    },
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    module: { rules },
    devServer: {
        open: true, //abrir directamente el navegador
        port: 3000,
        //overlay: true, //abrir un overlay con los errores
        compress: true,
    },
    devtool: 'source-map'
}