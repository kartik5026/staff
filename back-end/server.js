const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const PeopleModel = require("./Model/People");
const Data = require("../People.json");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true

}))

//for getting form data using form
app.use(express.urlencoded({ extended: true }));

//for axios post request
app.use(express.json());


const uri = process.env.URI;
const secret_key = process.env.KEY; 

mongoose.connect(uri).then(() => {
    console.log("Connected to mongodb")
}).catch((err) => {
    console.log(err);
})

app.get("/getData", async (req, res) => {
    const token =  req.cookies.myToken;
    
    
    if (token) {
        try {
            const decode = jwt.verify(token, secret_key);
            const data = await PeopleModel.find();
            console.log("sending data to frontEnd");
            res.json(data);

        } catch (error) {
            console.log(error);
        }


        
    }
    else {
        res.json({message:'failed'});
    }


})

// i used it to add some dummy data in the database initially
// app.get("/people",  (req, res) => {

//     Data.map(async (people) => {

//         const userData =  await PeopleModel.create(people);
//         console.log("Added: "+people.first_name);


//     })

//     res.json({'message':"Already Added the users"});

// })

app.post("/newUser", async (req, res) => {
    const countUsers = await PeopleModel.countDocuments({});
    const updatedId = countUsers + 1;
    const { newuserImage, userName, userEmail, userContact, userJob } = req.body;
    const data = await PeopleModel.create({ id: updatedId, first_name: userName, email: userEmail, contact: userContact, job: userJob, userImage: newuserImage });
    res.json({ message: 'Added New User Successfully' });

})

app.post("/update", async (req, res) => {
    try {
        const { newuserImage, prevUserName, userName, userEmail, userContact, userJob } = req.body;
        console.log(req.body);
        const UpdatedData = await PeopleModel.findOneAndUpdate({ first_name: prevUserName }, { first_name: userName, email: userEmail, contact: userContact, job: userJob, userImage: newuserImage });
        res.json({ message: "Successfully Updated the user" });

    } catch (error) {
        console.log(error);
    }


})
app.post("/search", async (req, res) => {
    const { val } = req.body;
    console.log(req.body);
    const result = await PeopleModel.find({ first_name: val })

    res.send(result);
})
app.post("/delete", async (req, res) => {
    const { username } = req.body;
    const deletedUser = await PeopleModel.findOneAndDelete({ first_name: username });
    res.json({ message: "User Deleted" });
})

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const myPassword = "admin";
    const isPasswordMatch = bcrypt.compareSync(myPassword, hashedPassword);
    if (isPasswordMatch) {
        const token = jwt.sign({ username }, secret_key, { expiresIn: '1h' });
        res.cookie('myToken', token, {
            httpOnly: true,
        })
        res.send("Logged In Success");


    }
    else{
    res.send("Invalid Password");
    }


})

app.get("/overview",(req,res)=>{
    const token= req.cookies.myToken;
    if(token){
        const decode = jwt.verify(token,secret_key);
        console.log(decode.username);
        res.json({msg:decode.username});
    }
    else{
        res.json({msg:"failed"});
    }
})

app.get("/logout",(req,res)=>{
    
    res.clearCookie('myToken');
    res.send("logged out");
})
app.listen(3000, () => {
    console.log("Server runnin on 3000");
})