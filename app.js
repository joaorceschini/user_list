const cors = require('cors');
const express = require('express');
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const port = process.env.PORT || 4567;

app.use(cors())


app.get('/users/:id', async (req, res) => {

  const users = await prisma.user.findMany()

  const page = req.params.id;
  const limit = 15;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const result = users.slice(startIndex, endIndex)

  
  try {
    return res.json(result)
  } catch (error) {
    console.log(error)
  }
})

app.get('/users', async (req, res) => {

  const users = await prisma.user.findMany()
  
  try {
    return res.json(users)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port)
