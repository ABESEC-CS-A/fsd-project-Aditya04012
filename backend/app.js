const express=require("express");
const morgan=require("morgan");
const userRoute=require("./routes/userRoute")
require('dotenv').config();

const app=express();

//middlewares
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("hello ")
});

app.use('/api/v1/user',userRoute);
/*app.use('/api/v1/quiz');
app.use('api/v1/exam');
*/

module.exports=app;