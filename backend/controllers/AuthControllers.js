const User=require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const{promisify}=require('util');



const signUp=id=>{
 return jwt.sign({id},"secretdata",{expiresIn:'1d'});
}

exports.signup=async(req,res)=>{

  const password=bcrypt.hashSync(req.body.password, 10);

  const user=await User.create({
   name: req.body.name,
   password:password,
   email:req.body.email,
   role:req.body.role

  });

  const token=signUp(user._id);

  res.status(201).json({
    status:"sucess",
    token,
    data:{
      user
    }

  })
}
exports.login=async(req,res)=>{
const {email,password}=req.body;
if(!email || !password){
  return res.status(201).json({
    status:"fail",
    message:"invalid email or password"
  });
}

const user=await User.findOne({email});
if(!user || !(await bcrypt.compareSync(password, user.password))){
  return res.status(201).json({
    status:"fail",
    message:"invalid email or password"
  });
  
}


const token=signUp(user._id);
res.status(201).json({
  status:"sucess",
  token
});

}


exports.protect = async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token is present
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized",
      });
    }

    // Verify token
    const decoded = await promisify(jwt.verify)(token, 'secretdata'); // Ensure the secret matches the one used in login

   
    const user = await User.findById(decoded.id);
    
    
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

