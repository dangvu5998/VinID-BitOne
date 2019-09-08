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
                            "label": "User Name",
                            "required": true,
                            "placeholder": "User Name"
                        },
                        {
                            "type": "input",
                            "input_type": "number",
                            "name": "userAge",
                            "label": "User Age",
                            "required": false,
                            "placeholder": "Contest Description"
                        },
                        {
                            "type": "input",
                            "input_type": "text",
                            "name": "userGender",
                            "label": "User Gender",
                            "required": false,
                            "placeholder": "Contest Description"
                        },
                    ]
                }
            }
        });
    });
}
