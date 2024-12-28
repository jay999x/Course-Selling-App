//const {Schema, default:mongoose}= require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId= mongoose.Types.ObjectId;
mongoose.connect(process.env.MONGO_URL);
const userSchema = new Schema({

    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

const purchaseSchema = new Schema({

    userId: objectId,
    courseId: objectId
})

const courseSchema = new Schema({

    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: objectId


})

const userModel = mongoose.model('user', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);
const courseModel = mongoose.model('course', courseSchema);

module.exports ={
 userModel,
  adminModel,
  purchaseModel,
   courseModel

}
