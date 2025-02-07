// require("dotenv").config()
const mongoose = require("mongoose")


const connectDB = async ()=>{
    try{

       await mongoose.connect(process.env.MONGO_URI)
       console.log("DB Connected")

    }catch(e){
        console.log("db connection fail")
        process.exit(1)
    }
}

module.exports = connectDB