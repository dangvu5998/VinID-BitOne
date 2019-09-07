'use strict';

module.exports = function(Question) {

  Question.createQuestion = async (req, contestId, description, answers) => {
    console.log(req.userId);
    return [{msg:'ok'}];
  }

  Question.remoteMethod('createQuestion', {
    http: {path: '/', verb: 'post'},
    accepts: [
      {arg: 'req', type: 'object', 'http': {source: 'req'}},
      {arg: 'contest_id', type: 'string'},
      {arg: 'description', type: 'string'},
      {arg: 'answers', type: 'object'}
    ],
    returns: [
      {arg: 'data', type: 'object'},
    ]
  })
};
