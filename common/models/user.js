'use strict';
let to = require('await-to-js').to;
module.exports = function(User) {

    User.createUser = async function(req) {
        let userData = {
            userId:req.userId,
            fullName:req.fullName,
            gender:req.gender,
            age:req.age
        }
        User.upsert(userData)
        //let context = vinJson.createJson();
        //return "1";
        return [{
            "data": {
              "metadata": {
                "app_name": "Contest",
                "app_id": 123456,
                "title": "Hãy tạo 1 contest thú vị  nào ...",
                "submit_button": {
                  "label": "Update Question",
                  "background_color": "#6666ff", 
                  "cta": "request",
                  "url": ""
                },
                "reset_button":  {
                  "label": "Reset Question",
                  "background_color": "#6666ff", 
                  "cta": "request",
                  "url": ""
                },
                "elements": [
                  {
                    "type":"input",
                    "name": "contestName",
                    "input_type":"text",
                    "label":"Contest Name",
                    "required": true,
                    "placeholder": "Contest Name"
                  },
                ]
              }
            }
        }]
    }


    User.remoteMethod(
        'createUser', {
            http: {path: '/', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}}            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
};
