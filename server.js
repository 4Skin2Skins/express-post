//require the express nodejs module
var express = require('express'),
	//set an instance of exress
	app = express(),
	//require the body-parser nodejs module
	bodyParser = require('body-parser'),
	//require the path nodejs module
	path = require("path");


//NATIONBUILDER 
var nationbuilder = require('nationbuilder');
var OAuth2 = nationbuilder.auth.OAuth2;
var async = require('async');
var oauth2Client = new OAuth2(); 
var people = nationbuilder.people('v1');

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true })); 

//tell express that www is the root of our public web folder
app.use(express.static(path.join(__dirname, 'www')));

//nationbuilder config.
oauth2Client.setCredentials({
	access_token: '8ed1d053434838e1ba5222260799d79b0e4498e0f27705ef86055c3e6aaa10af'
});
nationbuilder.options({
	params: {
		slug: 'lukasoktabadev',
	},
	auth: oauth2Client
}); 

people.list(function(err, response){
	//tell express what to do when the /form route is requested
	app.post('/form',function(req, res){
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({
			person: {
				first_name : req.body.firstName || null,
				last_name : req.body.lastName || null
			}
		}));
		//debugging output for the terminal
		console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
	});
});




//wait for a connection
app.listen(3000, function () {
  console.log('Server is running. Point your browser to: http://localhost:3000');
});