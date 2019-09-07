module.exports = function (app) {
    app.get('/api-init-selection', function (req, res) {
        return res.json({
            "data": {
                "metadata": {
                    "app_name": "Contest",
                    "app_id": 123456,
                    "title": "...",
                    "submit_button": {
                    	"label": "Next",
                    	"background_color": "#6666ff", 
                        "cta": "request",
                        "url": "/api-init-selection"
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
                        "content": "Select:"
                    },
                    {
	                    "label": "Selection",
	                    "type": "radio",
	                    "display_type": "inline", 
	                    "required": true,
	                    "name": "selection",   
	                    "placeholder": "", 
	                    "options": [{
	                        "label": "Tạo Contest mới.",   //Tên hiển thị
	                        "value": "1"  //Giá trị
	                      }, {
	                        "label": "Thêm câu hỏi mới.",
	                        "value": "2"
	                      },
	                      {
	                        "label": "Thư viện câu hỏi.",
	                        "value": "3"
	                      }
						]
	                }

                    ]
                }
            }
        });
    });
}