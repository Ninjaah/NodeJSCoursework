var express = require('express');
var app = express();
var URL = require('url').URL;


// This responds with "Hello World" on the homepage
app.get('/', function (req, res) {
    console.log("Got a GET request for the homepage");
    res.send('Hello GET');
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
    console.log("Got a POST request for the homepage");
    res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
    console.log("Got a DELETE request for /del_user");
    res.send('Hello DELETE');
})



// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
    console.log("Got a GET request for /ab*cd");
    res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "example_db"

});


let result2 = [];

con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT event_date.Date, event.Name, event.Type, Location.Location_name"
    + " FROM event_date, event, location"
    + " WHERE event_date.Event_id = event.Event_id and event.Location_Location_id = Location.Location_id"
        , function (err, result, fields) {
        if (err) throw err;
            result2=result;
            callback(null, result);
    });
    const callback = (err, res)=> console.log("Error: ", err, "Result: ", res);

// This responds a GET request for the /list_user page.
    app.get('/list_event', function (req, res) {
        console.log("Got a GET request for /list_event");
        res.send(result2);

    })
});

function getAllEvents(){

    return result2;
}

