// server.js

// Replace with your stripe public and secret keys
const keyPublishable = 'pk_test_J0wFOYMrJQQsLv874nTFU9AT';
const keySecret = 'sk_test_CjKEZXwArbb1Jy1Yi05B8XqC';

// MASH STRIPE TEST KEY: pk_test_J0wFOYMrJQQsLv874nTFU9AT
// MASH STRIPE SECRET KEY: sk_test_CjKEZXwArbb1Jy1Yi05B8XqC

// ONI STRIPE TEST KEY: pk_test_fseQvgioTBYVkqdlm4lTlczl
// ONI STRIPE SECRET KEY: sk_test_4nIvshjRjLIcWVpXard0woJQ


const app = require("express")();
const stripe = require("stripe")("sk_test_CjKEZXwArbb1Jy1Yi05B8XqC");
const pug = require('pug');
const path = require('path');
const cors = require('cors')
const firebase = require("firebase-admin");
const bodyParser = require('body-parser');

var id = null;
var name = null;
var email = null;
var ip = null;

var id_get = null;
var name_get = null;
var email_get = null;
var ip_get = null;

app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// *********FIREBASE AUTHENTICATION*************//

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fir-backend-c6a4c.firebaseio.com"
});

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref("stripe_database");

ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});


/*app.get('/', (req, res) => {
  res.send("GET IS WORKING");
});*/

//********************************//

app.post('/charge', (req, res) => {
    //res.send("POST IS WORKING");
    console.log(req.body);
    //console.log(JSON.stringify(req));
    const amount = 7200;

    //const event_json = JSON.parse(req.body);
    //console.log(event_json);


    //*** TOKEN RETRIEVE ***//

    /*
                         stripe.tokens.retrieve(req.body, function(err, token) 
                          {   
                              // STEP 1
                              console.log(token); 
    
                              // STEP 2
                              stripe.customers.create({
                                   email: req.body.stripeEmail,
                                   source: req.body.stripeToken
                                })
                            .then(customer => stripe.charges.create({
                                  amount: amount,
                                  description: 'Avengers',
                                  currency: 'usd',
                                  customer: customer.id
                                }));
    
                            // STEP 3
    
    
                          });
                       //  res.render('index');
    
                       */
});


// set view files directory as views
app.set('views', path.join(__dirname, 'views'));
// set view engine as pug
app.set('view engine', 'pug')

// GET http://localhost:3000/
app.get("/", ((req, res) => {
    res.render("index"); // render the view file : views/index.pug
}));

// ******************** FRONT END CODES ***********************//



// app listening on port 3000
app.listen(3000, () => {
    console.log(`App is running at: http://localhost:3000/`);
});