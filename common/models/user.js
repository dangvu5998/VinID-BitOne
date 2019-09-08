'use strict';
let to = require('await-to-js').to;
module.exports = function(User) {

    User.createUser = async function(req,userId) {
      let [err, user] = await to(User.findOne({where: {userId: userId}}))
      console.log(user)
      if (user === null) {
        let userData = {
          userId:userId,
          fullName:req.body.fullName,
          gender:req.body.gender,
          age:req.body.age
        }
        User.upsert(userData)   
      }  
      return {
        "metadata": {
          "app_name": "Contest",
          "app_id": 123456,
          "title": "BIT",
          "submit_button": {
            "label": "Start do contest",
            "background_color": "#6666ff", 
            "cta": "request",
            "url": ""
          },
          "elements": [
            {
                "type": "text",
                "style": "heading",
                "content": "Are you ready?"
            },
          ]
        }
      };
      
    }


    User.remoteMethod(
        'createUser',  {
            http: {path: '/:userId', verb:  'post'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg:'userId',type:'string',require:true}],
            returns: [
              {arg: 'data', type:'object'}],
        },
    )
};
