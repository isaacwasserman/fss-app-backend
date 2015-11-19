var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.friends-select.org/calendars/index.aspx";

router.get('/', function(req, res){
  request(url,function(err,res2,body){
    var $ = cheerio.load(body);
    var events  = [];
    var $events = $('.calendar-day dd h4');
    for(var x = 0; x < $events.length; x++) {
      d = $($events[x]).text();
      events.push(d);
    }
    var dayevents = [];
    for(i=0;i<events.length;i++){
      if(events[i].length == 5 && events[i].indexOf("Day") != -1){
        dayevents.push(events[i]);
      }
    }
    res.send(dayevents[0]);
  });
});

module.exports = router;