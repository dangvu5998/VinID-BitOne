'use strict';

let vjson = require('../utils/vinid-json')
let app = require('../../server/server')
let to = require('await-to-js').to

function questionToResponse(question) {

}

module.exports = function(Question) {
    Question.playerGetQuestion = async function(userContestId){
        let questionForm = vjson.createJson()
        let Question = app.models.Question
        let Contest = app.models.Contest
        let UserContest = app.models.UserContest
        let [err0, userContest] = await to(UserContest.find({where: {userContestId: userContestId}}))
        if (err0){

        }
        let [err1, contest] = await to(Contest.find({where: {contestId: userContest.contestId}}))
        let [err2, question] = await to(Question.find({where: {questionId: contest.questions[userContest.currentQuestion]}}))
        if (err2) {
            console.log(err)
            vjson.addElement(orderForm, {
                type: 'text',
                style: 'paragraph',
                content: 'Error when finding current question'
            })
            console.log(err)
            return questionForm;
        }
        let element = vjson.questionToForm(question)
        vjson.addElements(questionForm, element)
        return questionForm
    }

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
    Question.remoteMethod(
        'playerGetQuestion', {
            path: '/playerGetQuestion',
            accepts: [
                {arg: 'userContestId', type: 'string', required: 'true'},
                {arg: 'currentQuestion', type: 'number', required: 'true'}
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )
};
