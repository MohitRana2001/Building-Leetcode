const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = "mongodb+srv://mohit:1234@cluster0.yoozosp.mongodb.net/?retryWrites=true&w=majority"
console.log(MONGO_URI);

mongoose.connect(MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to database")
}).catch((err) => {
  console.error('Error connecting to database', err)
});

const testCaseSchema = new mongoose.Schema({
    input: {
      type: String,
      required: true
    },
    output: {
      type: String,
      required: true
    }
  });

const questionSchema = new mongoose.Schema({
    questionId: {
        type: Number,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy','medium','hard']
    },
    title: {
        type: String,
        requried: true,
        unique: true
    },
    description: {
        type: String,
        requried: true,
        unique: true
    },
    testCases: {
        type: [testCaseSchema],
        required: true
      },
    status: {
        type: Boolean,
        required: true,
        default: false
    }
});

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
const QuestionList = mongoose.model('question', questionSchema);
// const testcase = mongoose.model('testcase', testCaseSchema);

const newUser = new User({
    email: 'mohit@example.com',
    password: 'mohit'
  });

newUser.save()
.then(() => {
    console.log("new user saved");
    process.exit(0);
}).catch((err) => {
    console.error(err);
});

const questionInstance = new QuestionList({
        questionId: 1,
        difficulty: 'easy',
        title: "Two states",
        description: "Given an array , return the maximum of the array?",
        testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }],
        // status: false
    });

    console.log(questionInstance);
    questionInstance.save();
    console.log({message: "Successfully created a question instance"});


module.exports = mongoose.connect;
