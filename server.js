// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// route for date, :date_string 
app.get("/api/:date_string",function(req,res){
  //console.log(req);
  let date = req.params.date_string;//string value of date, we get the data from req, specifically in params with the date_string included
  //https://www.geeksforgeeks.org/express-js-req-params-property/
  if(parseInt(date) > 5000){//if the year is less than year 5000, it will print
    let time = new Date(parseInt(date));
    res.json({
      "unix":time.getTime(),//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime
      "utc":time.toUTCString() //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString
    })
  }
  
  let check = new Date(date);//checks if the date is valid. If not, then the date is converted.
  if(check == "Invalid Date")res.json({"error" : "Invalid Date"});//if there is an error, we print out this message
  else{
  res.json({//converts the date into usable data
      "unix": check.getTime(),
      "utc": check.toUTCString()
      })
   }
  });

app.get("/api/",function(req,res){//this is when there is no input given
  let current = new Date(); //gets the current date
  res.json({//same concept but we just use the current date
    "unix":current.getTime(),
    "utc": current.toUTCString()
    });
  })

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
