const express = require('express')
const mongoose = require('mongoose')



const app = express();

app.use(express.json());

app.get('/',(req,res) => {
      return res.status(200).send({status:true,message:'server is running'});
})


app.listen(5000,() => {
      console.log('express app running on port',5000);
})