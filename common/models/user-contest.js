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

    UserContest.remoteMethod('createQRcode', {
        http: {path: '/createQRcode', verb: 'post'},
        accepts: [
            {arg: 'message', type: 'object', required: 'true'}
        ],
        returns: {arg: 'data', type: 'object'}
    })
    
    // UserContest.createReadyForm = async function(req){
    //     let readyForm = vjson.createJson()
    //     let element 
    //     element.type = "text"
    //     element.style = "heading"
    //     element.content = "Bạn sẵn sàng chơi chưa?"
    //     vjson.addElement(readyForm, element)
    //     return readyForm
    // }

    // UserContest.remoteMethod = async func

};
