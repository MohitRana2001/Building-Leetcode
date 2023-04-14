const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to database")
}).catch((err) => {
  console.error('Error connecting to database', err)
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

const newUser = new User({
    email: 'johndoe@example.com',
    password: 'JohnDoe'
  });

newUser.save()
.then(() => {
    console.log("new user saved");
    process.exit(0);
}).catch((err) => {
    console.error(err);
});


// module.exports = mongoose.connect;
