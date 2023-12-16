'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authorize = require('./auth/authorize.js');
const seed = require('./seed');

const app = express();
app.use(cors());
app.use(express.json());
app.use(authorize);

const PORT = process.env.PORT || 3001;
mongoose.connect( process.env.MONGODB_URL );

// Get access to the dogs collection
const Dogs = require('./models/dogs.js');

// Seed the DB
await seed(),then((data) => console.log(data));

// GET: ROUTE /dogs
app.get('/dogs', handleGetDogs);

app.get('/dogs/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const dog = await Dogs.findById(id);
    if (!dog) res.status(400).send('Unable to delete dog');
    
    res.status(200).send(dog);
  } catch (e) {
    res.status(500).send('Server Error');
  }
})

async function handleGetDogs( req, res ) {
  // req.user gets put on the request object by the "verify" in auth/authorize.js file
  console.log( req.user.email );
  const searchObject = {};

  if (req.user.email) {
    searchObject.email = req.user.email;
  }

  try {
    // dogs.find( {email: 'john@codefellows.com' })
    const dogsFromDb = await Dogs.find();
    if (dogsFromDb.length > 0) {
      res.status(200).send(dogsFromDb);
    } else {
      res.status(404).send('ERROR: No dogs saved in the database.');
    }
  } catch (e) {
    console.error(e);
    res.status(500).send('Server Error');
  }
}


app.listen(PORT, () => console.log(`Up on port ${PORT}`));