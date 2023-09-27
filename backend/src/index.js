const express = require('express');
const dbConnection = require('./common/dbConnection');
require('colors')
require('./common/env')

const app = express();

app.use(express.json());
dbConnection();
app.get('/',(req,res) => {
      return res.status(200).send({status:true,message:'server is running'});
})


app.listen(process.env.PORT,() => {
      console.log(`Express app running on port ${process.env.PORT}`.bgBlack.blue.bold);
})
