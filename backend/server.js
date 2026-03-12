import express from "express";
import cors from "cors";


import {db} from "./db/db.js";

app.use(cors());
app.use(express.json());

await db.exec(`
CREATE TABLE IF NOT EXISTS problems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problemId INTEGER UNIQUE,
  dateAssigned TEXT,
  dateSolved TEXT,
  reviewDate TEXT,
  status TEXT
)
`)

app.get("/health",(req,res)=>{
    res.json({status:"Server Running"})
})



app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`);
})