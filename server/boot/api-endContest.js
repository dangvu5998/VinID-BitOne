module.exports = function (app) {
    app.get('/api-endContest', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Kết thúc cuộc thi",
                    "ok_button": {
                        "label": "Ok",
                        "background_color": "#6666ff", //Background color of submit button
                        "cta": "request",
                        "url": ""
                    },
                    "reset_button": {
                        "label": "Xóa toàn bộ",
                        "background_color": "#669999" //Background color of reset button
                    },
                }
            }
        });
    });
}
