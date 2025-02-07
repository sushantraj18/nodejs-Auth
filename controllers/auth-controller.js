const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// register user

const registerUser = async(req,res)=>{

    const{userName,email,password,role} = req.body

    try{

        const checkExistingUser = await userModel.findOne({$or : [{userName},{email}]})
        if(checkExistingUser){
            return res.status(400).json({success : false,message : "username or email is alerady register please try with diffrent username and email"})
        }

        const salt =  await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const createNewUser = new userModel({userName,email,password:hashPassword,role : role || 'user'})
        await createNewUser.save()

        if(createNewUser){
            return res.status(201).json({success : true,message : "user created successfully!"})
        }else{
            res.status(400).json({success : false , message : "unable to create user"})
        }





    }catch(e){
        console.log(e)
        res.status(500).json({success : false ,message: "something went wrong ! try again"})
    }
}


// login user

const loginUser = async (req,res)=>{

    try{
        const {userName,password} = req.body

        const checkUser = await userModel.findOne({userName})
        if(!checkUser){
            return res.status(400).json({success : false,message : `invalid credentials!`})
        }

        const passCheck = await bcrypt.compare(password,checkUser.password)

        if(!passCheck){
            return res.status(401).json({success : false,message : "invalid credentials! "})
        }

        const accessToken = jwt.sign({
            userId : checkUser._id, 
            userName : checkUser.userName
            ,role:checkUser.role},process.env.JWT_SECRET_KEY,{expiresIn:"30m"})


            return res.status(200).json({success : true,message : "logged in succcessful",accessToken})

    }catch(e){
        console.log(e)
        res.status(500).json({success : false , message : "Something went wrong ! try again"})
    }
}

module.exports = {registerUser,loginUser}