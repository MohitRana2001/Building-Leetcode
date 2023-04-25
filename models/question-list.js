const mongoose = require("mongoose");
const {Schema} = mongoose;

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

const questionSchema = new Schema({
    questionId: {
        type: Number,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy','medium','hard'],
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

const QuestionList = mongoose.model('question', questionSchema);

module.exports = QuestionList;