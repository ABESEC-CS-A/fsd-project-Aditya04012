const express=require("express");
const router=express.Router();
const {createUser,patchUser,getUser,Delete}=require("../controllers/userControllers");
const {signup,login,protect}=require("../controllers/AuthControllers");


router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/:id").get(protect,getUser).patch(patchUser).delete(Delete);

module.exports=router;  