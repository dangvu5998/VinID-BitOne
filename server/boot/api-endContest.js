module.exports = function (app) {
    app.get('/api-endContest', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Kết thúc cuộc thi",
                    "submit_button": {
                        "label": "Ok",
                        "background_color": "#6666ff", //Background color of submit button
                        "cta": "request",
                        "url": "http://bitone.herokuapp.com/api-ranking"
                    },
                    "elements": [
                        {
                            "type": "text",
                            "style": "paragraph",
                            "content": "Chúc mừng bạn đã hoàn thành contest! \n Ấn OK để xem ranking"
                        },
                        {
                            "type": "input",
                        }
                    ]
                }
            }
        });
    });
}
