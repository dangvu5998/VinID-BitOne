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
                        "url": "http://bitone.herokuapp.com/api/Users/createUser"
                    },
                    "elements": [
                        {
                            "type": "input",
                            "name": "userName",
                            "input_type": "text",
                            "label": "Tên người chơi",
                            "required": true,
                            "placeholder": "..."
                        },
                        {
                            "type": "input",
                            "input_type": "number",
                            "name": "userAge",
                            "label": "Tuổi",
                            "required": false,
                            "placeholder": "..."
                        },
                        {
                            "type": "radio",
                            "name": "userGender",
                            "label": "Giới tính",
                            "display_type": "inline",
                            "required": true,
                            "options": [
                                {
                                    "label": "Nam",   //Tên hiển thị
                                    "value": "Nam"  //Giá trị
                                },
                                {
                                    "label": "Nữ",
                                    "value": "Nữ"
                                },
                                {
                                    "label": "Khác",
                                    "value": "Khác"
                                },
                            ]
                        },
                    ]
                }
            }
        });
    });
}
