const express        = require('express');
const bodyParser     = require('body-parser');
const cors           = require('cors')
const app            = express();
const firebase 		 = require("firebase-admin");

var id 			= null;
var name 		= null;
var country 	= null;
var type 		= null;
var bname 		= null;
var currency 	= null;
var fingerprint = null;
var name 		= null;

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential : firebase.credential.cert(serviceAccount),
    databaseURL: "https://fir-backend-c6a4c.firebaseio.com"
});

var admin = require("firebase-admin");

var db  = admin.database();
var ref = db.ref("webhook");

ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});

app.use(require('body-parser').raw({type: '*/*'}));

app.post('/', function(request, response) {

	  response.send("Webhook done successfully");

	  const event_json = JSON.parse(request.body);
	
	  id 		  = event_json.data.object.id;
	  name 		  = event_json.data.object.account_holder_name;
	  country     = event_json.data.object.country;
	  type        = event_json.data.object.object;
	  bname       = event_json.data.object.bank_name;
	  currency    = event_json.data.object.currency;
	  fingerprint = event_json.data.object.fingerprint;

	  var creators = ref.child("calls");

	  creators.push({
	  CustomerCall:
	  {
		  id 	      : event_json.data.object.id,
		  name        : event_json.data.object.account_holder_name,
		  country     : event_json.data.object.country,
		  type        : event_json.data.object.object,
		  bname       : event_json.data.object.bank_name,
		  currency    : event_json.data.object.currency,
		  fingerprint : event_json.data.object.fingerprint
	  }
});

  response.send(200);
});

app.get('/', function(request, response) {

  response.send("CUSTOMER THAT MADE THE REQUEST\n\nID: "+id+"\nName: "+name+"\nCountry: "+country+"\nAccount-Type: "+type+"\nBank Name: "+bname+"\nCurrency: "+currency+"\nFingerprint Code: "+fingerprint)});

const port = 8080;
app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
