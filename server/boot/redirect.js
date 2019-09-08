
module.exports = function (app) {
    app.post('/api-init-selection', async function (req, res) {
        selection = req.body.selection
        if (selection == 1) {
            return res.json({
                "data": {
                    "metadata": {
                        "app_name": "Contest",
                        "app_id": 123456,
                        "title": "Tạo Contest",
                        "submit_button": {
                            "label": "Save",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": "http:/bitone.herokuapp.com/api-saveContest"
                        },
                        "reset_button": {
                            "label": "Reset",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": ""
                        },
                        "elements": [
                            {                            
                                "type": "input",
                                "name": "contestName",
                                "input_type": "text",
                                "label": "Contest Name",
                                "required": true,
                                "placeholder": "Contest Name"
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "contestDes",
                                "label": "Contest Description",
                                "required": false,
                                "placeholder": "Contest Description"
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "Question",
                                "label": "Question",
                                "required": true,
                                "placeholder": "qs1;qs2;qs3;..."
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "Score",
                                "label": "Score Submit",
                                "required": true,
                                "placeholder": "score_qs1;score_qs2;score_qs3;..."
                            },
                            {
                                "type": "input",
                                "input_type": "text",
                                "name": "TimeStart",
                                "label": "Time Start",
                                "required": true,
                                "placeholder": "hh:mm dd:mm:yy"
                            }, 
                            {
                                "type": "input",
                                "input_type": "text",
                                "name": "TimeOut",
                                "label": "Duration",
                                "required": true,
                                "placeholder": "xx (s)"
                            }
                        ]
                    }
                }
            });
        }
        else if (selection == 2) {
            return res.json({
                "data": {
                    "metadata": {
                        "app_name": "Contest",
                        "app_id": 123456,
                        "title": "BIT",
                        "submit_button": {
                            "label": "Save",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": "http://bitone.herokuapp.com/api-addQuestion"
                        },
                        "reset_button": {
                            "label": "Reset",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": ""
                        },
                        "elements": [  
                            {
                                "type": "input",
                                "name": "question",
                                "input_type": "textarea",
                                "label": "Question",
                                "required": true,
                                "placeholder": ""
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "answerA",
                                "label": "Answer A",
                                "required": true,
                                "placeholder": ""
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "answerB",
                                "label": "Answer B",
                                "required": true,
                                "placeholder": ""
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "answerC",
                                "label": "Answer C",
                                "required": true,
                                "placeholder": ""
                            },
                            {
                                "type": "input",
                                "input_type": "textarea",
                                "name": "answerD",
                                "label": "Answer D",
                                "required": true,
                                "placeholder": ""
                            },
                            {
                                "type": "radio",
                                "name": "trueAnswer",
                                "label": "True Answer",
                                "display_type": "inline",
                                "required": true,
                                "options": [
                                    {
                                        "label": "A",   //Tên hiển thị
                                        "value": "1"  //Giá trị
                                    },
                                    {
                                        "label": "B",
                                        "value": "2"
                                    },
                                    {
                                        "label": "C",
                                        "value": "3"
                                    },
                                    {
                                        "label": "D",
                                        "value": "4"
                                    }
                                ]
                            },
                            {
                                "type": "radio",
                                "name": "continueAdd",
                                "label": "Continue",
                                "display_type": "inline",
                                "required": true,
                                "options": [
                                    {
                                        "label": "Thêm tiếp câu hỏi",   //Tên hiển thị
                                        "value": "1"  //Giá trị
                                    },
                                    {
                                        "label": "Kết thúc thêm câu hỏi",
                                        "value": "0"
                                    }
                                ]
                            }
                        ]
                    }
                }
            });
        }
        else {
            let question = app.models.Question;
            return res.json(await question.pickQuestion());
            // return res.json({
            //     "data": {
            //     }
            // });
        };
    });
}