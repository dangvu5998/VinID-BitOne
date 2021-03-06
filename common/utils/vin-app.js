function appFormTemplate(additionAttr) {
  let result = {
    data: {
      metadata:{
        app_name: "Sân chơi trí tuệ",
        app_id: 123456,
        ...additionAttr
      }
    }
  }
  return result;
}

module.exports = {
    createJson: function() {
        return {
            "data": {
                "metadata": {
                    "app_name": "bitOne",
                    "title": "bitOne",
                    "submit_button": {
                        "label": "Gửi thông tin",
                        "background_color": "#6666ff",
                        "cta": "request",
                        "url": ""
                    },
                    "reset_button": {
                        "label": "Xoá bản ghi",
                        "background_color": "#669999"
                    },
                    "elements": []
                }
            }
        }
    },
    
    addElement: function(json, element) {
        json.data.metadata.elements.push(element);
    },

    addElements: function(json, elements) {
        for (i in elements) {
            element = elements[i]
            this.addElement(json, element);
        }
    },

    updateURL: function(json, newURL){
        json.data.metadata.submit_button.url = newURL
    }
}