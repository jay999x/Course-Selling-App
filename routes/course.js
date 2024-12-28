const {Router} = require('express');
const {userMiddleware} = require('../middleware/user')
//const { courseModel } = require('../db');
const courseRouter = Router();
const {purchaseModel, courseModel} = require ("../db")

courseRouter.post("/purchase", userMiddleware, async function(req, res){

const purchases = await purchaseModel.create({
userId: req.userId,
courseId: req.body.courseid

})

    res.json({
        
        message: 'You have successfully purchased the course'


    })

});

courseRouter.get("/preview", async function(req, res){

    const courses = await courseModel.find({})

res.json({

    courses
})
});

module.exports ={
    courseRouter: courseRouter,
    
}