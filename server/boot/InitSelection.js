module.exports = function (app) {
    app.get('/api-init', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Bit One",
                    "submit_button": {
                        "label": "Next",
                        "background_color": "#6666ff",
                        "cta": "request",
                        "url": "http:/bitone.herokuapp.com/api-init-selection"
                    },
                    "reset_button": {
                        "label": "Reset",
                        "background_color": "#6666ff",
                        "cta": "request",
                        "url": ""
                    },
                    "elements": [
                        {
                            "type": "input"
                        },
                    //     {
                    //         "type": "text",
                    //         "style": "heading",
                    //         "content": "Select: "
                    //     },
                    //     {
                    //         "label": "",
                    //         "type": "radio",
                    //         "display_type": "inline",
                    //         "required": true,
                    //         "name": "selection",
                    //         "placeholder": "",
                    //         "options": [
                    //             {
                    //                 "label": "Tạo Contest mới.",   //Tên hiển thị
                    //                 "value": "1"  //Giá trị
                    //             },
                    //             {
                    //                 "label": "Thêm câu hỏi mới.",
                    //                 "value": "2"
                    //             },
                    //             {
                    //                 "label": "Thư viện câu hỏi.",
                    //                 "value": "3"
                    //             }
                    //         ]
                    //     }
                    ]
                }
            }
        });
    });
}
