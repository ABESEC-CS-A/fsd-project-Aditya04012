const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
         require:[true,"please provide a name"],
         maxlength:[30],
         minlength:[3]
    },
    email:{
        type:String,
        unique:true,
        require:[true,"please provide a name"],
      

        
    },
    password:{
        type:String,
        require:[true,"plz provide a password"],
        
         
    },
    role:{
        type:String,
        enum:["user","admin","guide","lead-guide"],
        default:"user",
        select:false
    }
}); 

const user=mongoose.model('user',userSchema);
module.exports=user;