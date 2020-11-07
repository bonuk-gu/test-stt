const proxy =  require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/result',
        proxy({
            target: 'http://localhost:5000',
            changeOrigitn: true,
        })
    );
};