'use strict';
let to = require('await-to-js').to;
module.exports = function(User) {

<<<<<<< HEAD
    User.createUser = async function(req) {
      let userId = req.user_id
      console.log(userId)
      console.log("HAHAH")
      let contestId = "1"
      let [err, user] = await to(User.findOne({where: {userId: userId}}))
      

      if (user === null) {
        let userData = {
          userId:userId,
          fullName:req.body.userName,
          gender:req.body.userGender,
          age:req.body.userAge
=======
    User.createUser = async function(req,userId,contestId) {
      let [err, user] = await to(User.findOne({where: {userId: userId}}))
      console.log(user)
      if (user === null) {
        let userData = {
          userId:userId,
          fullName:req.body.fullName,
          gender:req.body.gender,
          age:req.body.age
>>>>>>> parent of 5935899... fix api information
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
            "url": "http://bitzero.herokuapp.com/api/Contests/"+contestId+"/firstQuestion"
          },
          "elements": [
            {
                "type": "text",
                "style": "heading",
                "content": "Are you ready?"
            },
            {
              "type": "input"
            }
          ]
        }
      };
      
    }


    User.remoteMethod(
        'createUser',  {
            http: {path: '/createUser', verb:  'post'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg:'userId',type:'string',require:true},
                {arg:'contestId',type :'string',require:true}],
            returns: [
              {arg: 'data', type:'object'}],
        },
    )
};
