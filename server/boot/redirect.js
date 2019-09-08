
module.exports = function (app) {
    app.post('/api-init-selection', function (req, res) {
        selection = req.body.value
        if (selection == 1){
            return res.json({
               "data": {
                  "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "...",
                    "submit_button": {
                        "label": "Save",
                        "background_color": "#6666ff", 
                        "cta": "request",
                        "url": "http://bitone.herokuapp.com/createContest"
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
                        "type":"input",
                        "name": "contestName",
                        "input_type":"text",
                        "label":"Contest Name",
                        "required": true,
                        "placeholder": "Contest Name"
                    },
                    {
                        "type":"input",
                        "input_type":"text",
                        "name": "contestDes",
                        "label":"Contest Description",
                        "required": false,
                        "placeholder": "Contest Description"
                    },
                     {
                        "type":"input",
                        "input_type":"textarea",
                        "name": "Question",
                        "label":"Question",
                        "required": true,
                        "placeholder": "qs1;qs2;qs3;..."
                    },
                    {
                        "type":"input",
                        "input_type":"textarea",
                        "name": "Score",
                        "label":"Score Submit",
                        "required": true,
                        "placeholder": "score_qs1;score_qs2;score_qs3;..."
                    },
                    {
                        "type":"input",
                        "input_type":"text",
                        "name": "TimeStart",
                        "label":"Time Start",
                        "required": true,
                        "placeholder": "hh:mm dd:mm:yy"
                    },
                    {
                        "type":"input",
                        "input_type":"text",
                        "name": "TimeOut",
                        "label":"Duration",
                        "required": true,
                        "placeholder": "xx (s)"
                    }
                    ]
                }
              }
            });
        }
        else if ( selection == 2) {
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
                        "type": "text",
                        "style": "heading",
                        "content": "Select: "
                    },
                    {
                        "type":"input",
                        "name": "content",
                        "input_type":"text",
                        "label":"Content",
                        "required": true,
                        "placeholder": "Contest "
                    },
                    {
                        "type":"input",
                        "input_type":"textarea",
                        "name": "answerList",
                        "label":"Answer",
                        "required": true,
                        "placeholder": "answer1;answer2;..."
                    },
                     {
                        "type":"input",
                        "input_type":"textarea",
                        "name": "trueAnswer",
                        "label":"Question",
                        "required": true,
                        "placeholder": "1 or 2 or 3 or 4"
                    }]
                    }
                }
              });
             }    
             else {
            // let question = app.models.Question;
            // return question.pickQuestion();
                return res.json({
                    "data": {
                    }
                  });
             };
    });
}