'use strict';
let to = require('await-to-js').to

module.exports = function(Contest) {
	Contest.createContest = async (req, res, contestName, contestDes, Question, Score, TimeStart, TimeOut  ) => {
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
                        "url": ""
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
    
    Contest.getDescription = async (req) =>{
        let [err, contest] = await to(Contest.findOne({where: {constestId: req.body.constestId}}));
        console.log(req.userId);
        return {
            "metadata": {
              "app_name": "Contest",
              "app_id": 123456,
              "title": "BIT",
              "submit_button": {
                "label": "Go to contest",
                "background_color": "#6666ff", 
                "cta": "request",
                "url": "http://bitzero.herokuapp.com/api/Users/"+req.body.userId
              },
              "elements": [
                {
                    "type": "text",
                    "style": "heading",
                    "content": contest.contestDes
            
                },
              ]
            }
        };
    }


	Contest.remoteMethod(
		'getDescription',{ 
            http: {path: '/getDescription', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
            ],
            returns: [
                {arg: 'data', type:'object'}]
        }
    )


	Contest.remoteMethod(
		'createContest',{ 
            http: {path: '/createContest', verb: 'post'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}},
                {arg: 'contestName', type: 'string' },
                {arg: 'contestDes', type: 'string'},
                {arg: 'question', type: 'object'},
                {arg: 'score', type: 'object'},
                {arg: 'timeStart', type: 'date'},
                {arg: 'timeOut', type: 'date'}
            ],
            returns: [{type:'object'}]
        }
    )
};
