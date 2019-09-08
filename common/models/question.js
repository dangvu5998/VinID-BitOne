'use strict';

let vjson = require('../utils/vin-app.js')
let app = require('../../server/server')
let to = require('await-to-js').to

function questionToResponse(question, submitURL){
    let elements = []
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
    // let nextQuestionElement
    // nextQuestionElement.type = "checkbox"
    // nextQuestionElement.display_type = "inline"
    // nextQuestionElement.name = "Submit"
    // nextQuestionElement.required = "true"
    // elements.push(nextQuestionElement)
    return elements
}

function cuQuestionForm(submitURL){
    let elements = []
    let questionElement = {}
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
        let element = {}
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
    Question.playerGetQuestion = async function(userId, contestId){
        let questionForm = vjson.createJson()
        let Question = app.models.Question
        let Contest = app.models.Contest
        let UserContest = app.models.UserContest
        let [err0, userContest] = await to(UserContest.findOne({where: {userId: userId, contestId: contestId}}))
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

    Question.createQuestion = async (req, res, content, answerList, trueAnswer) => {
        console.log(req.userId);
        let answers = answerList.split(';'); 
        let QuestionData = {
            contest: content,
            answerList: answers,
            trueAnswer: trueAnswer
        }
        Question.upsert(QuestionData)
        return res.json({
                "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Tạo",
                    "text_view": {
                        "type": "text",
                        "style": "heading",
                        "content": "Hãy tạo contest"
                    },
                    "submit_button": {
                        "label": "Tao Contest",
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
                    },
                    ]
                    }
                }
            });
    }

    Question.pickQuestion = async function(){
        let questionForm = vjson.createJson()
        let [err, listQuestion] = await to(Question.find())
        let question = {}
        question.type = "checkbox"
        question.display_type = "dialog"
        question.name = "questions"
        // question.required = "true"
        // question.placehoder = "Vui lòng chọn câu hỏi"
        let temp = []
        for (let i in listQuestion){
            let element = {}
            element.label = listQuestion[i].content
            element.value = i
            temp.push(element)
        }
        
        question.options = temp
        vjson.addElement(questionForm, question)
        questionForm.data.metadata.submit_button.url = "https://bitone.herokuapp.com/api-init"
        questionForm.data.metadata.submit_button.label = "Trở lại"

        return questionForm
    }

    Question.remoteMethod('createQuestion', {
        http: {path: '/create_question', verb: 'post'},
        accepts: [
            {arg: 'req', type: 'object', 'http': {source: 'req'}},
            {arg: 'contest', type: 'string'},
            {arg: 'answerList', type: 'object'},
            {arg: 'trueAnswer', type: 'number'}
        ],
        returns: [
            {type: 'object'},
        ]
    })

    Question.remoteMethod(
        'playerGetQuestion', {
            http: {path: '/playerGetQuestion', verb: 'post'},
            accepts: [
                {arg: 'userId', type: 'string', required: 'true'},
                {arg: 'contestId', type: 'string', required: 'true'}
            ],
            returns: {arg: 'data', type: 'object'}
        }
    )

    Question.remoteMethod(
        'pickQuestion', {
            http: {path: '/api-pickQuestion', verb: 'get'},
            accepts: [],
            returns: {arg: 'data', type: 'object'}
        }
    )
}
