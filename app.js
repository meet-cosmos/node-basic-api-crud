const express  = require("express");
const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/restapi")
const User = require("./models/user");
const conn = require("./connection/conn");
const e = require("express");
conn();
const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.get('/', (req,res)=>{
    console.log(req.query.name)
    res.send("App started")
})

app.get("/api/v1/users", async(req,res)=>{
    try{
        const {name = "", page = 1, pagesize = 5} = req.query;
        // let user;
        console.log(req.query);
        const user = await User.find({}).skip(pagesize * (page - 1)).limit(pagesize);
        // if(name === ""){
        //     user = await User.find({})
        // }
        // else{
        //     user = await User.find({name:name})
        // }
        res.send({
            status:"success",
            user
        })
    }catch(e){
        res.status(500).send({
            status:"failed",
            message:e.message
        })
    }
})

app.get("/api/v1/users/:id", async(req,res)=>{
    try{
        const user = await User.find({_id:req.params.id})
        res.send({
            status:"success",
            user
        })
    }catch(e){
        res.status(500).send({
            status:"failed",
            message:e.message
        })
    }
})

app.put("/api/v1/users/:id", async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate({_id : req.params.id}, req.body, {new:true})
        res.send({
            status:"success",
            user
        })
    }catch(e){
        res.status(500).send({
            status:"failed",
            message:e.message
        })
    }
})

app.delete("/api/v1/users/:id", async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete({_id : req.params.id})
        res.send({
            status:"success",
            user
        })
    }catch(e){
        res.status(500).send({
            status:"failed",
            message:e.message
        })
    }
})

app.post("/api/v1/users", async(req,res)=>{
    try{
        const user = await User.create(req.body)
        res.status(201).json({
            status:"success",
            user
        })
    }catch(e){
        res.status(500).json({
            status:"failed",
            message:e.message
        })
    }
})

app.get('*', (req,res)=>{
    res.status(404).send("Invalid request")
})

app.listen(5000, ()=>console.log("Listening to port 5000"))

