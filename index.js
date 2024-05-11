const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 3000; 

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

try{
    // console.log(process.env.DBURL);
    const connect =  mongoose.connect("mongodb+srv://davidabhisekhg:abhi1234@cluster0.egku1ws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        
    });
    console.log("Db Connected")
}
catch(error){
    console.error(error)  
    process.exit(1);  
}

//registration Schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email : String,
    password : String
});

//model

const Registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/pages/index.html");
})

app.post("/register", async (req,res)=>{
    try{
        const{name,email,password}= req.body;

        const existingUser = await Registration.findOne({email : email});
        if(!existingUser) {
            const registartionData = new Registration({
                name,
                email,
                password 
            });
            await registartionData.save();
            res.redirect("/success");
        }

        else{
            console.log("User already exists");
            res.redirect("/error");
        }
        }

        
    catch{
        console.log(error);
        res.redirect("error");
    }
})


app.get("/success",(req,res)=>{
    res.sendFile(__dirname + "/pages/success.html");
})

app.get("/error",(req,res)=>{
    res.sendFile(__dirname + "/pages/error.html");
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
