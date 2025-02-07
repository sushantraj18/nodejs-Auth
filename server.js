require("dotenv").config()
const express = require("express")
const connectDB = require("./database/db")
const authRouter = require("./routes/auth-routes")
const homeRouter = require("./routes/home-routes")

const app = express()


const PORT = process.env.PORT || 3000

connectDB()
// middleware
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/home",homeRouter)



app.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}`)
})
