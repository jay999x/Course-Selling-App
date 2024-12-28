const {Router} = require("express");
const userRouter = Router();
//const userModel = require('../db');   
const {userMiddleware} = require('../middleware/user');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const {userModel, courseModel, purchaseModel} = require('../db');



userRouter.post("/signup", function(req, res){
     const email = req.body.email;
     const password= req.body.password;
     const firstName = req.body.firstname;
     const lastName = req.body.lastname;

    const user = userModel.create({
        email : email,
        password : password,
        firstName: firstName,
        lastName: lastName

    })
    if(user){
    res.json({

        message:"user created"
        
    })
    }
});

userRouter.post("/signin", function(req, res){

    const user = userModel.findOne({
        email: req.body.email,
        password: req.body.password
    })
if(user){

    const token = jwt.sign({
        id:user._id
    }, JWT_SECRET)

    res.json({
        message: token
    })
}


    
});


userRouter.get("/purchases", userMiddleware,  async function(req, res){

const userid = req.id
const courses = await purchaseModel.find({
    userId: userid
})

const courseData = await courseModel.find({
    _id: {$in: courses.map(x=> x.courseId)}
})

res.json({
    courses: courseData
})
    
})



module.exports = {
    userRouter: userRouter
}