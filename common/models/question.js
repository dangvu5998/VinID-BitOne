'use strict';
let app = require('../../server/server')
const HOST_NAME = process.env.HOST_NAME;

function questionToResponse(question) {

}

module.exports = function(Question) {
    Question.playerGetQuestion = async function(req, contestId){
        let userId = app.models.userId
        let Question = app.models.Question
        let UserContest = app.models.UserContest
        try {
            let userContest = await UserContest.findOne({where: {userId, contestId}})
            let contest = await Contest.findOne({where: {_id: userContest.contestId}})
            let question = await Question.findOne({where: {questionId: contest.questions[userContest.currentQuestion]}})
            return [questionToResponse(question, `${HOST_NAME}/api/Questions/submit-answer-contest/${contestId}`), 200]
        }catch(e) {
            return ['error', 500]
        }
    }

    //  Question.createQuestion = async (req, contestId, description, answers) => {
    //    console.log(req.userId);
    //    return [{msg:'ok'}];
    //  }
    //
    //  Question.remoteMethod('createQuestion', {
    //    http: {path: '/', verb: 'post'},
    //    accepts: [
    //      {arg: 'req', type: 'object', 'http': {source: 'req'}},
    //      {arg: 'contest_id', type: 'string'},
    //      {arg: 'description', type: 'string'},
    //      {arg: 'answers', type: 'object'}
    //    ],
    //    returns: [
    //      {arg: 'data', type: 'object'},
    //    ]
    //  })
    Question.remoteMethod(
        'playerGetQuestion', {
            http: {path: '/contest/:id', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'id', type: 'string', required: 'true'},
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )

    Question.playerAnswerQuestion = async function(req, contestId, answer){
        let userId = app.models.userId
        let Question = app.models.Question
        let UserContest = app.models.UserContest
        try {
            let userContest = await UserContest.findOne({where: {userId, contestId}})
            let contest = await Contest.findOne({where: {_id: userContest.contestId}})
            let currentQuestion = userContest.currentQuestion
            let question = await Question.findOne({where: {questionId: contest.questions[currentQuestion]}})
            currentQuestion = currentQuestion + 1
            if(question.trueAnswer === answer) {
                await UserContest.updateAll({_id: UserContest._id}, {score: userContest.score + 1, currentQuestion: currentQuestion})
            } else {
                await UserContest.updateAll({_id: UserContest._id}, {currentQuestion: currentQuestion})
            }
            question = await Question.findOne({where: {questionId: contest.questions[currentQuestion]}})
            return [questionToResponse(question, `${HOST_NAME}/api/Questions/submit-answer-contest/${contestId}`), 200]
        }catch(e) {
            return ['error', 500]
        }
    }
    Question.remoteMethod(
        'playerAnswerQuestion', {
            http: {path: '/submit-answer-contest/:id', verb: 'post'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'id', type: 'string', required: 'true'},
                {arg: 'answer', type: 'number', required: 'true'}
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )

};

