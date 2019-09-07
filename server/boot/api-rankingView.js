module.exports = function (app) {
    app.get('/api-rankingView', function (req, res) {
        res.render('table');
    });
}
