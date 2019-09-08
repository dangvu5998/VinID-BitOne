module.exports = function (app) {
    app.post('/api-information/:userId/:contestId', function (req, res) {
        
        var User = app.models.Question;
        let [err, user] = await to(User.findOne({where: {userId: req.params.userId}}))

        if (user===null){
            return{
                "data": {
                    "metadata": {
                        "app_name": "Contest",
                        "app_id": 123456,
                        "title": "BIT",
                        "submit_button": {
                            "label": "Next questions",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": "http://bitzero.herokuapp.com/api/Users/"+req.params.userId+"/"+req.params.contestId
                        }
                    },
                    "elements": [
                        {
                            "type": "input",
                            "name": "name",
                            "input_type": "textarea",
                            "label": "name",
                            "required": true,
                            "placeholder": ""
                        },
                        {
                            "type": "input",
                            "name": "gender",
                            "input_type": "textarea",
                            "label": "gender",
                            "required": true,
                            "placeholder": ""
                        },
                        {
                            "type": "input",
                            "name": "age",
                            "input_type": "textarea",
                            "label": "age",
                            "required": true,
                            "placeholder": ""
                        }
                    ]    
                }
                
            }
        }else{
            return {
                "data": {
                    "metadata": {
                        "app_name": "Contest",
                        "app_id": 123456,
                        "title": "BIT",
                        "submit_button": {
                            "label": "Next questions",
                            "background_color": "#6666ff",
                            "cta": "request",
                            "url": "http://bitzero.herokuapp.com/api/Contests/"+req.params.contestId+"/firstQuestion"
                        }
                    },
                    "elements": [
                        {
                            "type": "text",
                            "style": "heading",
                            "content": "Are you ready?"
                        },
                    ]    
                }
                
            }
        } 
      
    })    
}

