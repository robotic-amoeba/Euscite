//SEED OUTDATED. 
//Should be refactored acording to new models and new research and entries structure

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Research = require("../models/Research");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://localhost/euscite', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let Raul;
let research;

let users = [
  {
    username: "Raul",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    research: []
  },
  {
    username: "Pepe",
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(bcryptSalt)),
    research: []
  }]

  let IDplaceHolder;
  

  User.deleteMany()
    .then(() => {
      return User.create(users)
    })
    .then(usersCreated => {
      console.log(`${usersCreated.length} users created with the following id:`);
      console.log(usersCreated.map(u => u._id));
      Raul = usersCreated[0]
    })
    .then(()=>{
      return Research.deleteMany()
    })
    .then(()=>{
      research = {

        name: "Eu ortophosphates as luminescent probes in biotechnology",
        admin: Raul._id,
        tags: ["Chemistry", "Biotechnology"],
        brach: false,
        entries: [
          {
            name: "This is Raul's first entry",
            timestamp: "2018-10-10 12:09:35.771",
            data: [{ type: "input", value: "This is a random input number 1" },
            { type: "input", value: "This is a random input number 2" },
            { type: "graph", value: "This is a random graph blah bla blah" }]
          },
          {
            name: "This is Raul's second entry",
            timestamp: "2018-11-11 14:09:35.771",
            data: [{ type: "input", value: "This is a random input number 1" },
            { type: "input", value: "This is a random input number 2" },
            { type: "graph", value: "This is a random graph blah bla blah" }]
          }
        ]
      }
    })
    .then(()=>{
      return Research.create(research)
    })
    .then((research)=>{
      console.log("created research: " + research)
      return User.findByIdAndUpdate(Raul._id, {$push:{research: research._id}})
    })
    .then((updated) => {
      console.log(updated)
      // Close properly the connection to Mongoose
      mongoose.disconnect()
    })
    .catch(err => {
      mongoose.disconnect()
      throw err
    })


