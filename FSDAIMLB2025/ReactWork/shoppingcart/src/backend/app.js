const express=require('express');
const cors=require('cors')
const fs=require('fs');
const PORT=5656;
const app=express();// create the http server
app.use(express.json());// middleware, convert the data into json format
app.use(cors());

app.get("/",(req,res)=>{
     res.send("<h2>Welcome to Express Server</h2>");
})

app.get("/msg",(req,res)=>{
res.json({msg:"Hii, inside /msg endpoint"})
})

app.post("/register",(req,res)=>{
    const data=req.body;
    console.log(data);
res.json({msg:"Registration done successfully!!!"})
})

app.post("/login",(req,res)=>{
res.json({msg:"Login api Calling"})
})
app.listen(PORT,()=>{
    console.log("Server is running on:"+PORT)
})

