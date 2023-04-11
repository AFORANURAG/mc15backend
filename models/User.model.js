const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    socketId:String,
},{versionKey:false})
// const contactSchema = mongoose.Schema({
//    id:{type:mongoose.Types.ObjectId}; 
// })

const Usermodel=mongoose.model("user",userSchema)

module.exports={Usermodel}