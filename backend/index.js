import express from 'express';
const app = express();
import cors from 'cors'
import connectDB from './utils/connectDB.js';
app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.listen(3000,()=>{
    connectDB();
    console.log("server is running1");
})