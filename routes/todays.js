var express = require('express');
var router = express.Router();
var request = require('request');

var url = 'http://raritea.com/ScheduleParse/data.js';

var dayurl = 'https://www.google.com/calendar/feeds/2smi71ngo1stlvs3dskc0q0io7bhpm3m%40import.calendar.google.com/public/basic?orderby=starttime&sortorder=ascending&futureevents=true&alt=json';

var getCalendar = function(callback) {
  request(dayurl, function(err, res, body) {
    callback(err, JSON.parse(body));
  });
}

var getSchedules = function(callback) {
  request(url, function(err, res, body) {
    callback(err, JSON.parse(body));
    var schedules = JSON.parse(body);
  });
}

router.get('/:id', function(req, res){
  getCalendar(function(err, data){
    var result = data;
    var events = [];
  for(i=0; i < result.feed.entry.length; i++){
    events.push(result.feed.entry[i]);
  }
  var eventstoday = [];
  var splitdate = Date().split(" ");
  var googledate =  [splitdate[0], splitdate[1], parseInt(splitdate[2]) + ","];
  for(i=0; i < events.length; i++){
    var eventdate = events[i].summary.$t.split(" ").slice(1,4);
    if(eventdate.toString() === googledate.toString()){
      eventstoday.push(events[i]);
    }
  }
  var scheduleday = "";
  for(i=0; i < eventstoday.length; i++){
    if(eventstoday[i].title.$t.search("Day 1") != -1 || eventstoday[i].title.$t.search("Day 2") != -1 || eventstoday[i].title.$t.search("Day 3") != -1 || eventstoday[i].title.$t.search("Day 4") != -1 || eventstoday[i].title.$t.search("Day 5") != -1 || eventstoday[i].title.$t.search("Day 6") != -1){
      console.log(eventstoday[i].title.$t);
      var thedayevent = eventstoday[i].title.$t;
    }
  }
    res.send(thedayevent);
    
    request(url, function(err, res2, body) {
    var schedules = JSON.parse(body.substring(15));
    
    var key, count = 0;
    for(key in schedules) {
      if(schedules.hasOwnProperty(key)) {
        count++;
      }
    }
    var JSONLength = count;
    
    var response = "Not Found";
    
    for (var key in schedules) {
      if (schedules.hasOwnProperty(key) && schedules[key]["id"] == req.params.id) {
        var response = schedules[key][thedayevent];
      }
    }
  });
    
  });
});

module.exports = router;
