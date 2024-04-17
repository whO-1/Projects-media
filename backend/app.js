const express = require('express');
const mongoose = require('mongoose');
const Group = require('./models/Group');
const User = require('./models/User');


const app = express();
mongoose.connect("mongodb://localhost:27017/?directConnection=true&tls=false");

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming form data







createGroup();
async function createGroup( ){
  try{
      const group = await Group.create({ 
          name: "Boss",
          createdAt: new Date().valueOf(),
          roles:{
            admin : "661fd22a99d2defcf85d3ce3"
          }
      });

      const user = await User.create({
          name: "Alioska",
          email: "armeASDASosmail@asda.com",
          password: "salaasdaSd4",
      });

      //console.log('Group:',user);
  }
  catch(e){
    console.log('error',e.message)
  }

}

find()
async function find (){
  try{
    const group  =  await Group.find( {name: 'Work'} );
    console.log("Groups:",group);
  }
  catch(e){
    console.log("error",e);
  }

}




// Routess
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});