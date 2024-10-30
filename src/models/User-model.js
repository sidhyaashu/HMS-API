import bcrypt from "bcryptjs"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) next();

    this.password = await bcrypt.hash(this.password,10);
    next()
})


userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password); // Optional cost factor
    } catch (error) {
      console.error('Error comparing passwords:', error);
      // Handle error appropriately (e.g., reject promise, throw custom error)
    }
  };


const User = mongoose.model("User",userSchema)
export default User