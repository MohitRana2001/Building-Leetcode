const express = require('express')
const bodyParser = require('body-parser');
const connect = require('./connect');
const QuestionList = require('./models/question-list');
const User = require('./models/users')
const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');


const SUBMISSION = [

]

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    console.log(`User created: ${user}`);
    res.redirect('/questions');
  } catch (err) {
    if (err.code === 11000) {
      console.log(`Duplicate key error: ${err}`);
      res.redirect('/questions');
    } else {
      console.error(`Error creating user: ${err}`);
      res.status(500).send('Error creating user');
    }
  }
});



app.post('/signup', async function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email , password} = req.body;

  const userExists = await User.findOne({email});

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)

  if(userExists){
    // res.write("User with this email already exists");
    return res.status(409).send("User with this email already exists").redirect("/questions");
  } 

  const newUser = new User({email , password});
  await newUser.save().then(() => {
    res.redirect("/questions");
  });

  // return back 200 status code to the client

  return res.status(200).send("User is successfuly added")
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


  //return the user all the questions in the QUESTIONS array
  //My questions are stored in the database in the questions collection.
  // How will I display those questions on this route.
 // assuming your Question model is defined in the 'models' directory

app.get('/questions', async function(req, res) {
    try {
      const questions = await QuestionList.find(); // retrieve all questions from the database
      console.log(questions); // render the 'questions' view with the retrieved questions array
      res.render('questions', {questions});
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving questions from the database"); // handle any errors that occur
    }
});

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