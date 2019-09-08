module.exports = function (app) {
    app.get('/api-submit-contest', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "Tao",
                    "text_view": {
                        "type": "text",
                        "style": "heading",
                        "content": "Hãy tạo 1 contest thú vị  nào ..."
                    },
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
    });
}
