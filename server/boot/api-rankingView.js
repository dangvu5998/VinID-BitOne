module.exports = function (app) {
    app.post('/api-rankingView', function (req, res) {
        res.render('table');
    });
}
