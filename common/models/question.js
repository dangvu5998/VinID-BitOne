'use strict';

let vjson = require('../utils/vinid-json')
let app = require('../../server/server')
let to = require('await-to-js').to

function questionToResponse(question, submitURL){
    let elements = []
    let questionElement 
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
        let element
        element.label = question.answerList[i]
        element.value = i
        temp.push(element)
    }
    answerElement.options = temp
    elements.push(answerElement)
    let nextQuestionElement
    nextQuestionElement.type = "checkbox"
    nextQuestionElement.display = "inline"
    nextQuestionElement.name = "Submit"
    nextQuestionElement.required = "true"
    elements.push(nextQuestionElement)
    return elements
}

function cuQuestionForm(submitURL){
    let elements = []
    let questionElement 
    questionElement.type = "input"
    questionElement.input_type = "textarea"
    questionElement.label = "Question"
    questionElement.required = "true"
    questionElement.name = "Question"
    questionElement.placehoder = "Vui lòng nhập câu hỏi"
    elements.push(questionElement)
    let i
    for (i=0; i<5; i++){
        let answerElement
        answerElement.type = "input"
        answerElement.input_type = "textarea"
        answerElement.label = "Answer"
        answerElement.required = "true"
        answerElement.name = "Answer"
        answerElement.placehoder = "Vui lòng nhập câu trả lời"
        elements.push(answerElement)
    }
    correctAnswerElement.type = "radio"
    correctAnswerElement.display_type = "inline"
    correctAnswerElement.name = "Correct answer"
    correctAnswerElement.required = "true"
    correctAnswerElement.placehoder = "Vui lòng chọn đáp án đúng"
    let temp = []
    for (i in question.answerList){
        let element
        element.label = i
        element.value = i
        temp.push(element)
    }
    answerElement.options = temp
    elements.push(answerElement)
    let nextQuestionElement
    nextQuestionElement.type = "checkbox"
    nextQuestionElement.display = "inline"
    nextQuestionElement.name = "Submit"
    nextQuestionElement.required = "true"
    elements.push(nextQuestionElement)
    return elements
}

function questionToResponse(question) {

}

module.exports = function(Question) {
    Question.playerGetQuestion = async function(userContestId){
        let questionForm = vjson.createJson()
        let Question = app.models.Question
        let Contest = app.models.Contest
        let UserContest = app.models.UserContest
        let [err0, userContest] = await to(UserContest.findOne({where: {userContestId: userContestId}}))
        let [err1, contest] = await to(Contest.findOne({where: {contestId: userContest.contestId}}))
        let [err2, question] = await to(Question.findOne({where: {questionId: contest.questions[userContest.currentQuestion]}}))
        if (err0||err1||err2) {
            vjson.addElement(orderForm, {
                type: 'text',
                style: 'paragraph',
                content: 'Error when finding current question'
            })
            return questionForm;
        }
        let element = questionToResponse(question)
        vjson.addElement(questionForm, element)
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
