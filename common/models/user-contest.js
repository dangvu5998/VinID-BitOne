'use strict';

const QRCode = require('qrcode')
const generateQR = async text => {
    try {
      console.log(await QRCode.toDataURL(text))
    } catch (err) {
      console.error(err)
    }
  }

let vjson = require('../utils/vin-app.js')
let app = require('../../server/server')
let to = require('await-to-js').to

module.exports = function(UserContest) {
    UserContest.createQRcode = async function(message){
        let QRForm = vjson.createJson()
        let qrCodesrc = generateQR(message)
        let element = {}
        element.type = "web"
        let temp = str.concat("<html><body><img src =", qrCodesrc, "></body></html>")
        element.content = temp
        vjson.addElement(QRForm, element)
        return QRForm
    }

    UserContest.remoteMethod('createQRcode', {
        http: {path: '/createQRcode', verb: 'post'},
        accepts: [
            {arg: 'message', type: 'object', required: 'true'}
        ],
        returns: {arg: 'data', type: 'object'}
    })
};
