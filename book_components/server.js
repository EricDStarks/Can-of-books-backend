'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
 const Books = require('./books');

// mongoose.connect(Dburl)
// .then(function (){
//   console.log("Successfully connected")
// })


const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

//Route for getting/retrieving the books from the collection, sending them back to the client, and handling any errors
app.get('/books', async (request, response) => {
  try{
    const books = await Books.find({})
    response.json(books);
  } catch (error) {
    console.log(error.message)
    response.status(500).json({error: 'Books Not Available'})
  }
  

});

//Starting the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
