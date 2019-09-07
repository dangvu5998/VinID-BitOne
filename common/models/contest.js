'use strict';

module.exports = function(Contest) {
	Contest.readyForm() = async function(contestId){
        let readyForm = vjson.createJson()
        vjson.addElement(readyForm, {
            type: 'text',
            style: 'paragraph',
            content: 'Bạn đã sẵn sàng để chơi chưa?'
        })
        vjson.addElement(readyForm, {
            label: "Ready",
            type: "radio",
            display_type: "inline",
            name: "Ready",
            required: "true",
            option: [{
                label: "Chưa",
                value: "not_ready"
            }, {
                label: "Sẵn sàng",
                value: "ready"
            }]
        })
        return questionForm
    }
}
