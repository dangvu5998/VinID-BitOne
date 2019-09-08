module.exports = function (app) {
    app.post('/api-addUser', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Nhập thông tin",
                    "submit_button": {
                        "label": "Ok",
                        "background_color": "#6666ff", //Background color of submit button
                        "cta": "request",
                        "url": ""
                    },
                    "elements": [
                        {                            
                            "type": "input",
                            "name": "userName",
                            "input_type": "text",
                            "label": "User Name",
                            "required": true,
                            "placeholder": "User Name"
                        },
                        {
                            "type": "input",
                            "input_type": "text",
                            "name": "userAge",
                            "label": "User Age",
                            "required": false,
                            "placeholder": "Contest Description"
                        },
                    ]
                }
            }
        });
    });
}
