const cors = require('cors');
const express = require('express');
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.use(cors())

app.get('/', async (req, res) => {

  const users = await prisma.user.findMany()

  try {
    return res.json(users)
  } catch (error) {
    console.log(error)
  }

})

app.listen('4567')