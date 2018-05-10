
// MASHRUK STRIPE TEST KEY: pk_test_J0wFOYMrJQQsLv874nTFU9AT
// MASHRUK STRIPE SECRET KEY: sk_test_CjKEZXwArbb1Jy1Yi05B8XqC

const app        = require("express")();
const stripe     = require("stripe")("sk_test_CjKEZXwArbb1Jy1Yi05B8XqC");
const pug        = require('pug');
const cors       = require('cors');
const firebase   = require("firebase-admin");
const bodyParser = require('body-parser');

var id        = null;
var name      = null;
var email     = null;
var ip        = null;
var id_get    = null;
var name_get  = null;
var email_get = null;
var ip_get    = null;

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// *********FIREBASE AUTHENTICATION*************//

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fir-backend-c6a4c.firebaseio.com"
});

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var db  = admin.database();
var ref = db.ref("stripe_database");

ref.once("value", function (snapshot) {
  console.log("*************************** INSIDE FIREBASE *******************************************");
  console.log(snapshot.val());
  console.log("*************************** INSIDE FIREBASE *******************************************");
});

app.post('/charge', (req, res) => {

          stripe.customers.create({
            email: req.body.email
          }).then(function(customer){
            return stripe.customers.createSource(customer.id, {
              source: 'tok_visa'
            });
          }).then(function(source) {
            return stripe.charges.create({
              amount: 2500,
              currency: 'usd',
              customer: source.customer
            });
          }).then(function(charge) {
            console.log("Customer created and Charged")
          }).catch(function(err) {
            console.log("Error Found") 
          });

    var creators = ref.child("DEMO");
    creators.push({
    CustomerCall:
    {
      id          : req.body.token.id,
      email       : req.body.email
    }
});
});
 
// app listening on port 3000
app.listen(3000, () => {
    console.log(`App is running at: http://localhost:3000/`);
});