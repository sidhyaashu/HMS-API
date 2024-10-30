// =======================================IMPORT LIBRARIES=======================================
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/db-config.js"



// ========================================CONFIGARATIONS========================================
dotenv.config()
connectDB()
const app = express()



// ==========================================MIDDLEWARE==========================================
app.use(express.json())
app.use(morgan("tiny"))
app.use(helmet())


// ============================================ROUTES============================================
app.get("/",(req,res)=>{
    res.json({message:"Hi i'm from the server"})
})




// =============================================HANDLERS=============================================




export default app