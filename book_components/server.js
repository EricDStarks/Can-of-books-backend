'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./books');
const app = express();
const axios = require('axios');

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

//Route for getting/retrieving the books from the collection, sending them back to the client, and handling any errors
app.get('/books', async (request, response) => {
  try{
    await mongoose.connect(process.env.MONGOOSE);
    const books = await Books.find()
    await mongoose.disconnect();
    response.json(books);
  } catch (error) {
    console.log(error.message)
    response.status(500).json({error: 'Books Not Available'})
  }
});

app.post('/books', async (request, response) => {
  const {title, description, status} = request.body;
  try {
    await mongoose.connect(process.env.MONGOOSE);
    const book = await Books.create({
      title: title,
      description: description,
      status: status
  });
    await mongoose.disconnect();
    response.send(book);
  } catch (error) {
    response.json([{ title: "error from post", description: error.message }]);
  }
});

app.delete('/books', async (request, response) => {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    const book = await Book.findByIdAndDelete(request.params.id);
    const books = await Book.find({});
    mongoose.disconnect();
    response.json(books);
  } catch (error) {
    response.json(error.message);
  }
});

app.put('/books', async (request, response) => {
  const { description, status, title } = request.body;
  try {
    await mongoose.connect(process.env.MONGOOSE);
    const book = await Book.findByIdAndUpdate(
      request.params.id,
      { description, status, title },
      { new: true }
    );
    const books = await Book.find({});
    mongoose.disconnect();
    response.json(books);
  } catch (error) {
    response.json(error.message);
  }
});

//Starting the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
