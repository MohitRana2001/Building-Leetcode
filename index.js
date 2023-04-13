const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = 3000;


// mongoose.connect(process.env.MONGO_URI , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("Connected to database")
// }).catch((err) => {
//   console.error('Error connecting to database')
// });

const userSchema = new mongoose.Schema({
  email : {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]


app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
})


app.post('/signup', async function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email , password} = req.body;

  const userExists = await User.findOne({email});

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

  if(userExists) return res.status(409).send("User with this email already exists");

  const newUser = new User({email , password});
  await newUser.save();

  // return back 200 status code to the client

  return res.status(200).send("User is successfuly added");
})

app.post('/login', async function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email,password} = req.body;
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = await User.findOne({email});

  if(!user) return res.status(401).send("Invalid email ID");

  if(user.password !== password) return res.status(401).send("Invalid password");

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  res.status(200).send({token});
});

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  // const questions = [];
  // for(let i in QUESTIONS){
  //   questions.push(QUESTIONS[i]);
  // }
  res.send(QUESTIONS);
})

app.get("/submissions", function(req, res) {
  
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})