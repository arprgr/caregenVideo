var express = require('express');
var router = express.Router();
var models = require('../server/models/index');
//var schedulerFunction = require ('./lcScheduler.js') ;
var Moment = require('moment-timezone');

router.post('/', function(req, res) {

console.log('in the lc reminder service, scheduling your reminder' + req.body);

    var mesgLoad = req.body;
    
        console.log('in the lc scheduler function' + mesgLoad.dateStr);
        var vid = mesgLoad.vid ;
        var year = parseInt(mesgLoad.year);
        var day = parseInt(mesgLoad.day);
        var month = parseInt(mesgLoad.month);
        var hr = parseInt(mesgLoad.hr);
        var min = parseInt(mesgLoad.min);
        var senderEmailId = mesgLoad.senderEmailId;
        var receiverEmailId = mesgLoad.receiverEmailId;
        var timeZone = mesgLoad.timeZone;
        var sec = 0;
        var inputStr = mesgLoad.dateStr;
        var date = new Date(inputStr);
        var rightNow = new Date(Date.now() + 5000);
        var newYorkTime = Moment.tz(date, "America/New_York");
        var losAngeles = newYorkTime.clone().tz("America/Los_Angeles");
        var centralAmerica = newYorkTime.clone().tz("America/Chicago");
        var india = newYorkTime.clone().tz("Asia/Kolkata");

        console.log('this is the date and time now::' + rightNow + "  and this was selected::" + date );
        console.log('New York :' + newYorkTime.format() + " Los Angeles :" + losAngeles.format() + " Central timeZone" + centralAmerica.format());

        var deliverAt = newYorkTime.format() ; // defaulting to eastern timezone

        if (timeZone == "Eastern") {deliverAt = newYorkTime.format()} ;
        if (timeZone == "Central") {deliverAt = centralAmerica.format()} ;
        if (timeZone == "Pacific") {deliverAt = losAngeles.format()} ;
        if (timeZone == "IST") {deliverAt = india.format()} ;


        console.log(vid + ' ' + year + ' ' + ' ' + senderEmailId + deliverAt);

       
                console.log('scheduling the reminder'); 
               models.Messages.create({
                vid: vid,
                senderEmailId: senderEmailId,
                receiverEmailId : receiverEmailId,
                messageType: 'Reminder',
                status: 'unread',
                location: 'inbox',
                timeZone: timeZone,    
                deliverAt: deliverAt
            }).then(function (Message) {
                if(Message) {
                console.log('new reminder created! ');
                 res.status(200).send('success');
                }
            });
});

module.exports = router;

