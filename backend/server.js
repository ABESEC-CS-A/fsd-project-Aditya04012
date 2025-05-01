const mongoose = require("mongoose");
const app=require("./app");




let DB=process.env.DB;
mongoose.connect(DB).then(()=>{
    console.log("Connected to DataBase 🌍");   
  }).catch((err)=>{
    console.log("failed to connect with DB 🧨🧨")
  })


    app.listen(3000,()=>{
        console.log("server is live at port 3000")
    });