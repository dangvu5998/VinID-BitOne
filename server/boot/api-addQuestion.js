// let app = require('../server');
module.exports = function (app) {
    app.post('/api-addQuestion', function (req, res) {
        userId = req.user_id
        question = req.body.question
        anwserA = req.body.anwserA
        anwserB = req.body.anwserB
        anwserC = req.body.anwserC
        anwserD = req.body.anwserD
        trueAnwser = req.body.trueAnwser
        continueAdd = req.body.continueAdd

        // Add question to database
        questionModel = app.models.Question
        questionModel.creat(
            {
                "questionId" : "",
                "content": question,
                "answerList": [anwserA, anwserB, anwserC, anwserD],
                "trueAnswer": trueAnswer,
                "userId": userId,
            })


        // Continue add question or done
        if (continueAdd == 1) {
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
                            "url": "http://bitone.herokuapp.com/createQuestion"
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
            })
        }
        else {
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
                                "type": "text",
                                "style": "heading",
                                "content": "Select: "
                            },
                            {
                                "label": "",
                                "type": "radio",
                                "display_type": "inline",
                                "required": true,
                                "name": "selection",
                                "placeholder": "",
                                "options": [
                                    {
                                        "label": "Tạo Contest mới.",   //Tên hiển thị
                                        "value": "1"  //Giá trị
                                    },
                                    {
                                        "label": "Thêm câu hỏi mới.",
                                        "value": "2"
                                    },
                                    {
                                        "label": "Thư viện câu hỏi.",
                                        "value": "3"
                                    }
                                ]
                            }
                        ]
                    }
                }
            })
        }
    });
}