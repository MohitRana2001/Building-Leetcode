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

try {
  questionInstance.save();
  console.log({ message: "Successfully created a question instance" });
} catch (error) {
  console.error(error);
  console.log({ message: "Error creating a question instance" });
}

