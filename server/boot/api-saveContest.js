module.exports = function(app){
    app.post('/api-saveContest', async function(req, res){
        contestName = req.body.contestName
        contesDes = req.body.contesDes
        questionList = req.body.Question.split(';')
        scoreList = req.body.Score.split(';')
        timeStart = req.body.TimeStart
        timeOut = req.body.TimeOut
        ownerId = req.user_id

        contestModel = app.models.Contest
        let time = timeStart.split(' ')[0].split(':')
        let date = timeStart.split(' ')[1].split(':')
        //console.log(date)
        timeStart = new Date(date[2], date[1], date[0], time[0], time[1], 0, 0)
        timeOut = new Date(0,0,0,0,0,timeOut,0)

        contestModel.create(
            {
                "contestId": "123",
                "contestName": contestName,
                "contestDes": contesDes,
                "question": questionList,
                "score" : scoreList,
                "timeStart": timeStart,
                "timeOut": timeOut,
                "ownerId": ownerId,
            }
        )

        contestUser = app.models.UserContest
        formQR = await contestUser.createQRcode("https://qr.id.vin/hook?url=http://bitone.herokuapp.com/api-start&method=POST?contestId=123")
        return res.json({
            "data": formQR
        })
    });
}