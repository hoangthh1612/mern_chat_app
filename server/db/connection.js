const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;


mongoose.connect(url, {useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})