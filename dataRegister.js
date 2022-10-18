const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const axios = require("axios");

async function dataRegister() {
  try {
    const { data } = await axios(
      "https://randomuser.me/api?format=json&results=30&inc=gender,name,email,picture&nat=br&seed=giga"
    );

    main(data.results)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } catch (error) {
    console.log(error);
  }
}

async function main(users) {


  for (let user of users) {
    await prisma.user.create({
      data: {
        gender: user.gender,
        name: `${user.name.title}. ${user.name.first} ${user.name.last}`,
        email: user.email,
        picture: user.picture.medium,
      },
    })
  }


  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null });
}

dataRegister();
