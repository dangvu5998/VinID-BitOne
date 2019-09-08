'use strict';

const QRCode = require('qrcode')

let vjson = require('../utils/vin-app.js')
let app = require('../../server/server')
let to = require('await-to-js').to

module.exports = function(UserContest) {
    UserContest.createQRcode = function(message){
        let QRForm = vjson.createJson()
        return QRCode.toDataURL(message).then ((x)=>{
          //console.log(x)
          let element = {}
          element.type = "web"
          let temp = "<html><body><img src =\"" + x + "\"></body></html>"
          element.content = temp
          //console.log(temp)
          vjson.addElement(QRForm, element)
          return QRForm
        }, () => {
          console.log("Can't create QR code!");
        })
    }

    UserContest.createReadyForm = async function(message){
        let readyForm = vjson.createJson()
        let element 
        element.type = "text"
        element.style = "heading"
        element.content = "Bạn sẵn sàng chơi chưa?"
        vjson.addElement(readyForm, element)
        vjson.updateURL(readyForm, "")
        return readyForm
    }

    UserContest.remoteMethod('createQRcode', {
        http: {path: '/createQRcode', verb: 'post'},
        accepts: [
            {arg: 'message', type: 'object', required: 'true'}
        ],
        returns: {type: 'string'}
    })
    
    UserContest.remoteMethod('createReadyForm',{
        http: {path: '/createReadyForm', verb: 'post'},
        accepts: [
            {arg: 'message', type: 'object', required: 'true'}
        ],
        returns: {type: 'object'}
    })

};
