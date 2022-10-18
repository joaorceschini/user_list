const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');

app.use(cors())

app.get('/', async (req, res) => {
  
  try {
    const { data } = await axios('https://randomuser.me/api?format=json&results=30&inc=gender,name,email,picture&nat=br&seed=giga');
    console.log(data.results)
    return res.json(data.results)
  } catch (error) {
    console.log(error)
  }

})

app.listen('4567')