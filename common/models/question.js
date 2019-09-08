'use strict';
let vjson = require('../utils/vin-app.js')
let app = require('../../server/server')
const HOST_NAME = process.env.HOST_NAME;

function appFormTemplate(additionAttr) {
  let result = {
      metadata:{
          app_name: "Contest",
          app_id: 123456,
          ...additionAttr
      }
  }
  return result;
}

function questionToResponse(question, submitURL){
    let elements = []
    let questionElement
    let questionElement ={}
    questionElement.type = "text"
    questionElement.style = "paragraph"
    questionElement.content = question.questionContent
    elements.push(questionElement)
    let answerElement
    answerElement.type = "radio"
    answerElement.display_type = "inline"
    answerElement.name = "answer"
    answerElement.required = "true"
    answerElement.placehoder = "Vui lòng chọn đáp án"
    let temp = []
    let i
    for (i in question.answerList){
        let element ={}
        element.label = question.answerList[i]
        element.value = i
        temp.push(element)
    }
    answerElement.options = temp
    elements.push(answerElement)
    let nextQuestionElement
    nextQuestionElement.type = "checkbox"
    nextQuestionElement.display_type = "inline"
    nextQuestionElement.name = "Submit"
    nextQuestionElement.required = "true"
    elements.push(nextQuestionElement)
    return elements
}

function cuQuestionForm(submitURL){
    let elements = []
    let questionElement = {}
    questionElement.type = "input"
    questionElement.input_type = "textarea"
    questionElement.label = "Question"
    questionElement.required = "true"
    questionElement.name = "question"
    questionElement.placehoder = "Vui lòng nhập câu hỏi"
    elements.push(questionElement)
    let i
    for (i=0; i<4; i++){
        let answerElement = {}
        answerElement.type = "input"
        answerElement.input_type = "textarea"
        answerElement.label = `Answer ${i}`
        answerElement.required = "true"
        answerElement.name = `answer_${i}`
        answerElement.placehoder = "Vui lòng nhập câu trả lời"
        elements.push(answerElement)
    }
    let correctAnswerElement = {};
    correctAnswerElement.type = "radio"
    correctAnswerElement.display_type = "inline"
    correctAnswerElement.name = "true_answer"
    correctAnswerElement.required = "true"
    correctAnswerElement.placehoder = "Vui lòng chọn đáp án đúng"
    let temp = []
    for (i=0; i<4; i++){
        let element = {}
        element.label = i
        element.value = i
        temp.push(element)
    }
    let answerElement = {}
    answerElement.options = temp
    elements.push(answerElement)
    let nextQuestionElement = {}
    nextQuestionElement.type = "checkbox"
    nextQuestionElement.display = "inline"
    nextQuestionElement.name = "Submit"
    nextQuestionElement.required = "true"
    elements.push(nextQuestionElement)
    return elements
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

    Question.getQuestionForm = async () => {
      return cuQuestionForm(`${HOST_NAME}/api/Questions/`);
    }

    Question.remoteMethod('getQuestionForm', {
        http: {path: '/question-form', verb: 'get'},
        returns: {arg: 'data', type: 'object'}
    })


    Question.createQuestion = async (req, content, answers) => {
      console.log(req.userId);
      return [{msg:'ok'}];
    }

    Question.remoteMethod('createQuestion', {
      http: {path: '/', verb: 'post'},
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'question', type: 'string'},
        {arg: 'answer_1', type: 'string'},
        {arg: 'answer_2', type: 'string'},
        {arg: 'answer_3', type: 'string'},
        {arg: 'answer_4', type: 'string'},
        {arg: 'true_answer', type: 'number'},
      ],
      returns: [
        {arg: 'data', type: 'object'},
      ]
    })

    Question.pickQuestion = async function(){
        let questionForm = vjson.createJson()
        let [err, listQuestion] = await to(Question.find())
        let question = {}
        question.type = "checkbox"
        question.display_type = "inline"
        question.name = "Pick questions"
        question.required = "true"
        question.placehoder = "Vui lòng chọn câu hỏi"
        let temp = []
        let i
        for (i in listQuestion){
            let element
            element.label = listQuestion[i].content
            element.value = i
            temp.push(element)
        }
        question.options = temp
        vjson.addElement(questionForm, question)
        return questionForm
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
            http: {path: '/contest/:id', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'id', type: 'string', required: 'true'},
                {arg: 'userContestId', type: 'string', required: 'true'}
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

    Question.remoteMethod(
        'pickQuestion', {
            http: {path: '/pickQuestion', verb: 'post'},
            accepts: [],
            returns: {arg: 'data', type: 'object'}
        }
    )
}
