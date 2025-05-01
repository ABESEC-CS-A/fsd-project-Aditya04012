const User=require("../models/userModel");

exports.getUser=async(req,res)=>{
 const id=req.params.id;
 const user=await User.findById(id);
if(!user){
 return res.status(400).json({
    status: "fail",
    message:"not found"
 });
}
 res.status(201).json({
  status: "success",
  data: {
   user
  }
});

}





exports.patchUser=async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,req.body);
   const user=await User.findById(req.params.id);
   res.status(200).json({
    status: "success",
    data: {
     user
    }
   });

}


exports.Delete=async(req,res)=>{
await User.deleteOne({_id:req.params.id});
res.status(204).json({
  status: "success",
  data: null
   
})
}