const {Router} = require("express");
const adminRouter = Router();
const {adminModel, courseModel} = require('../db')
const jwt = require("jsonwebtoken");
const {z} = require("zod");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const {middleware} =require('../middleware/admin')



adminRouter.post('/signup', async function(req, res){

const requireBody = z.object({

    email: z.string().min(4).max(100).email(),
    password: z.string().min(4).max(100),
    firstName: z.string().min(3).max(100),
    lastName:z.string().min(3).max(100)

})
const parsedData = requireBody.safeParse(req.body);
if(parsedData.success){
    await adminModel.create({

        email:req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName



    });
    res.json({
        message: 'User Created'
    })

}

else{
    res.json({

        message: parsedData.error
    })
}
    
})

adminRouter.post('/signin', async function(req, res){
    
    const requiredBody= z.object({
        email: z.string().min(4).max(100).email(),
        password: z.string().min(4).max(100)

    })
    const parsedBody = requiredBody.safeParse(req.body);

    if(parsedBody.success){

        const user = await adminModel.findOne({
            email: req.body.email,
            password: req.body.password

        })
        if(user){
            const token = jwt.sign({
                id:user._id
            }, JWT_ADMIN_SECRET)

            res.json({

                message: token
            })
        }
    }

    
})

adminRouter.put('/course',middleware, async function(req, res){

    const course = await courseModel.updateOne({
        creatorId: req.id,
        _id: req.body.courseId
    },
{
    title: req.body.title,
    price: req.body.price,
    imageURL: req.body.imageURL,
    description: req.body.description

}
)
res.json({
    message: 'Course Updated',
    courseID: course._id
})



   
})
adminRouter.post('/course', middleware, async function(req, res){

    const { title, description, imageURL, price } = req.body;
    const adminId = req.id;
const course = await courseModel.create({
    title: title,
    description: description,
    price: price,
    imageURL: imageURL,
    creatorId: adminId


})

    res.json({
        message: 'Course created'
    })
})
adminRouter.get('/course/bulk',middleware, async function(req, res){

    const adminId = req.id
    
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        message: 'This is signup endpoint',
        courses

    })
})


module.exports = {
    adminRouter: adminRouter
}