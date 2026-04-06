import express from 'express';
import pool from './db.js';  
// import mysql from 'mysql2/promise';
// import { promisify } from 'util';
// import bcrypt from 'bcrypt';
import 'dotenv/config';
import { createUser } from "./models/user.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.post("/signup", async (req, res) => {
    let userData = req.body;
    await createUser(userData);
    console.log("successfully inserted");
    res.json({
        message : "insertion successfully done"
    })
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});