const express = require('express');
const app = express();
const accountRouter = require('./account/account.js'); // Renamed 'account' to 'accountRouter' for clarity
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require('cors');
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser());
app.use('/', accountRouter); // Mount the account router


app.use(cors());



mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

 
const PORT =4500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
