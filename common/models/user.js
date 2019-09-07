'use strict';
let to = require('await-to-js').to;
// let vinJson  = require('../utils/vin-app');

module.exports = function(User) {

    User.createUser = async function(req) {
        let userData = {
            userId:req.userId,
            fullName:req.fullName,
            gender:req.gender,
            age:req.age
        }
        User.upsert(userData)
        let context = vinJson.createJson();
        return [200, 'success']
    }


    User.remoteMethod(
        'createUser', {
            http: {path: '/', verb: 'get'},
            accepts: [
                {arg: 'req', type: 'object', 'http': {source: 'req'}}            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
};
