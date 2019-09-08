'use strict';
let to = require('await-to-js').to
var app = require('../../server/server');
//var Question = app.models.Question;

module.exports = function (Contest) {
	Contest.createContest = async (req, res, contestName, contestDes, Question, Score, TimeStart, TimeOut) => {
		console.log(req.userId)
		qs = Question.split(';');
		sc = Score.split(';');
		let ContestData = {
			contestName: contestName,
			contestDes: contestDes,
			question: qs,
			score: sc,
			timeStart: TimeStart,
			timeOut: TimeOut
		}

		Contest.upsert(ContestData)
		return res.json({
			"data": {
				"metadata": {
					"app_name": "Contest",
					"app_id": 123456,
					"title": "BIT",
					"submit_button": {
						"label": "Save",
						"background_color": "#6666ff",
						"cta": "request",
						"url": ""
					},
					"reset_button": {
						"label": "Reset",
						"background_color": "#6666ff",
						"cta": "request",
						"url": "http://bitone.herokuapp.com//createContest"
					},
					"elements": [
						{
							"type": "text",
							"style": "heading",
							"content": "Ban da tao contest thanh cong!"
						}
					]
				}
			}
		});
	}

	Contest.getDescription = async (req) => {
		let contestId = 1
		let userId = req.body.userId
		let [err, contest] = await to(Contest.findOne({ where: { contestId: contestId/*req.header.contestId*/ } }));
		console.log(req.userId);
		console.log(req)
		return {
			"metadata": {
				"app_name": "Contest",
				"app_id": 123456,
				"title": "BIT Contest",
				"submit_button": {
					"label": "Go to contest",
					"background_color": "#6666ff",
					"cta": "request",
					"url": "http://bitone.herokuapp.com/api-addUser"					
				},
				"elements": [
					{
						"type": "text",
						"style": "heading",
						"content": contest.contestDes
					},
					{
						"type": "input",
					},
				]
			}
		};
	}

	Contest.getNextQuestion = async (req, contestId, numberQuestion, trueAnswer, score, indexQuestion) => {

		let lastAnswer = req.body.Answers[0];

		if (lastAnswer === trueAnswer) score = (Number(score) + 1).toString();

		if (Number(indexQuestion) > Number(numberQuestion) - 1) {
			return {
				"metadata": {
					"app_name": "Contest",
					"app_id": 123456,
					"title": "Kết thúc cuộc thi",
					"submit_button": {
						"label": "Ok",
						"background_color": "#6666ff", //Background color of submit button
						"cta": "request",
						"url": "http://bitone.herokuapp.com/api-ranking"
					},
					"elements": [
						{
							"type": "text",
							"style": "paragraph",
							"content": "Chúc mừng bạn đã hoàn thành contest! \n "
								+ "Điểm của bạn là " + score + "\n" + "Ấn OK để xem ranking"
						},
						{
							"type": "input",
						}
					]
				}
			}
		}

		let [err, contest] = await to(Contest.findOne({ where: { contestId: Number(contestId) } }));

		var Question = app.models.Question;
		let contentQuestion = await Question.findOne({ where: { questionId: contest.question[Number(indexQuestion)] } });

		return {
			"metadata": {
				"app_name": "Contest",
				"app_id": 123456,
				"title": "BIT",
				"submit_button": {
					"label": "Next questions",
					"background_color": "#6666ff",
					"cta": "request",
					"url": "http://bitone.herokuapp.com/api/Contests/" + contestId + "/number/" + numberQuestion + "/right/" + contentQuestion.trueAnswer + "/score/" + score + "/nextQuestion/" + (Number(indexQuestion) + 1).toString()
				},
				"elements": [
					{
						"type": "text",
						"style": "heading",
						"content": contentQuestion.content
					},
					{
						"type": "SCORE",
						"style": "heading",
						"content": score
					},
					{
						"label": "Câu trả lời",
						"type": "radio",
						"display_type": "inline",
						"required": true,
						"name": "Answers",
						"placeholder": "Chọn đáp án ",
						"options": [{
							"label": contentQuestion.answerList[0],
							"value": 1
						}, {
							"label": contentQuestion.answerList[1],
							"value": 2
						}, {
							"label": contentQuestion.answerList[2],
							"value": 3
						}, {
							"label": contentQuestion.answerList[3],
							"value": 4
						}
						]
					}

				]
			}
		};

	}


	Contest.getFirstQuestion = async (req, contestId) => {
		let [err, contest] = await to(Contest.findOne({ where: { contestId: Number(contestId) } }));
		let numberQuestion = contest.question.length;
		var Question = app.models.Question;
		let contentQuestion = await Question.findOne({ where: { questionId: contest.question[0] } });

		return {
			"metadata": {
				"app_name": "Contest",
				"app_id": 123456,
				"title": "BIT",
				"submit_button": {
					"label": "Next questions",
					"background_color": "#6666ff",
					"cta": "request",
					"url": "http://bitone.herokuapp.com/api/Contests/1/number/" + numberQuestion.toString() + "/right/" + contentQuestion.trueAnswer + "/score/0/nextQuestion/1"
				},
				"elements": [
					{
						"type": "text",
						"style": "heading",
						"content": contentQuestion.content
					},
					{
						"type": "SCORE",
						"style": "heading",
						"content": "0"
					},
					{
						"label": "Câu trả lời",
						"type": "radio",
						"display_type": "inline",
						"required": true,
						"name": "Answers",
						"placeholder": "Chọn đáp án ",
						"options": [{
							"label": contentQuestion.answerList[0],
							"value": 1
						}, {
							"label": contentQuestion.answerList[1],
							"value": 2
						}, {
							"label": contentQuestion.answerList[2],
							"value": 3
						}, {
							"label": contentQuestion.answerList[3],
							"value": 4
						}
						]
					}

				]
			}
		};
	}


	Contest.remoteMethod(
		'getDescription', {
			http: { path: '/getDescription', verb: 'get' },
			accepts: [
				{ arg: 'req', type: 'object', 'http': { source: 'req' } },
			],
			returns: [
				{ arg: 'data', type: 'object' }]
		}
	)

	Contest.remoteMethod(
		'getFirstQuestion', {
			http: { path: '/:contestId/firstQuestion', verb: 'post' },
			accepts: [
				{ arg: 'req', type: 'object', 'http': { source: 'req' } },
				{ arg: 'contestId', type: 'string', require: true }
			],
			returns: [
				{ arg: 'data', type: 'object' }]
		}
	)

	Contest.remoteMethod(
		'getNextQuestion', {
			http: { path: '/:contestId/number/:numberQuestion/right/:trueAnswer/score/:score/nextQuestion/:indexQuestion', verb: 'post' },
			accepts: [
				{ arg: 'req', type: 'object', 'http': { source: 'req' } },
				{ arg: 'contestId', type: 'string', require: true },
				{ arg: 'numberQuestion', type: 'string', require: true },
				{ arg: 'trueAnswer', type: 'string', require: true },
				{ arg: 'score', type: 'string', require: true },
				{ arg: 'indexQuestion', type: 'string', require: true }
			],
			returns: [
				{ arg: 'data', type: 'object' }]
		}
	)

	Contest.remoteMethod(
		'createContest', {
			http: { path: '/createContest', verb: 'post' },
			accepts: [
				{ arg: 'req', type: 'object', 'http': { source: 'req' } },
				{ arg: 'contestName', type: 'string' },
				{ arg: 'contestDes', type: 'string' },
				{ arg: 'question', type: 'object' },
				{ arg: 'score', type: 'object' },
				{ arg: 'timeStart', type: 'date' },
				{ arg: 'timeOut', type: 'date' }
			],
			returns: [{ type: 'object' }]
		}
	)
};
