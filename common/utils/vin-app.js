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
            "metadata": {
                "app_name": "bitOne",
                "title": "bitOne - Tự định nghĩa cách bạn mua hàng",
                "submit_button": {
                    "label": "Gửi thông tin",
                    "background_color": "#6666ff",
                    "cta": "request",
                    "url": "https://teambit.tech/api/send-response"
                },
                "reset_button": {
                    "label": "Xoá bản ghi",
                    "background_color": "#669999"
                },
                "elements": []
            }
        }
    },
    
    addElement: function(json, element) {
        json.metadata.elements.push(element);
    },

    addElements: function(json, elements) {
        for (i in elements) {
            element = elements[i]
            this.addElement(json, element);
        }
    }
}