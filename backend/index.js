const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db');
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


mongodb();

app.use((req, res, next)=>{
  res.setHeader("Access-Cantrol-Allow-Origin", "https://localhost:3000")
  res.header(
    "Acess-Cantrol-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})
app.use(cors(corsOptions)) // Use this after the variable declaration


app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})