var request = require('request');
var fs = require('fs');
var vivod = "";
request('https://api.meetup.com/2/open_events?&sign=true&photo-host=public&lat=48.836452&topic=css&city=Paris&category=34&lon=2.413619&radius=10&page=20&time=,1w&key=3e31d77116b6f1f1a5b2c201a2b298', function (err,res,body) {
	//if (err) throw err;
	var events = (JSON.parse(body))["results"];
	var day = 86400000;
	var start_date = (new Date()).setHours(0, 0, 0, 0) + 43200000;
	
	vivod= vivod+"<style type='text/css'> body{background-color: rgb(132, 255, 132); font-family:Arial; font-size:16px;} h3{display:inline; font-style:italic;} div{margin-bottom:10px;}</style>";
	vivod = vivod + "<h2 style='text-align:center;'>"+"Events in topic IT from " + (new Date(start_date)).toDateString() +" to "+ (new Date(start_date+day*7)).toDateString() +"</div>";
	for (var k = 0; k < 7; k++) {
		vivid=vivod+" "; 
		vivod = vivod + "<h3>" + "Date: "+ (new Date(start_date)).toDateString() + "</h3><br>";
		for (var i in events) {
			var event_date = new Date((events[i])["time"]);
			if (event_date > start_date && event_date < start_date + day) {
				vivod = vivod + "<div>" +  "<h3>Name: </h3>" + (events[i])["name"] + "</div>" ;
				
				vivod = vivod + "<div>"+"<h3>" + "Time: " + "</h3>" + (event_date.toTimeString()).substring(0,5)+"</div>";
				
				vivod = vivod +  "<div>" + "<h3>" + "Address: " + "</h3>" + ((events[i])["venue"])["address_1"]+"</div>";
				
				if ("description" in events[i]) {

					vivod = vivod + "<div>" + "<h3>" + "Description : " + "</h3>" + (events[i])["description"]+"</div>" ;
				}

				vivod = vivod +  "<div style='margin-bottom:60px;'>"+ "<h3>" +"Organizator: " + "<h3>" + ((events[i])["group"])["who"]+"</div>";
				vivod = vivod +  "<br>";
			}
		}
		start_date = start_date + day;
	}
	fs.writeFile("events.html", vivod, function(err) {
   		if (err) console.log(err);
	});
});
