import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const pool = require('./db');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

app.get("/api/notes" , async(req,res) =>{
    const notes = await prisma.note.findMany()
    res.json({notes})
})

app.post("/api/notes", async(req,res) =>{
    const {title, content} = req.body
    const note = await prisma.note.create({
        data:{
            title,
            content
        }
    })
    res.json({note})
})

app.put("/api/notes/:id", async(req,res) =>{
    const {id} = req.params
    const {title, content} = req.body
    const note = await prisma.note.update({
        where:{
            id: parseInt(id)
        },
        data:{
            title,
            content
        }
    })
    res.json({note})
})

app.delete("/api/notes/:id", async(req,res) =>{
    const {id} = req.params
    const note = await prisma.note.delete({
        where:{
            id: parseInt(id)
        }
    })
    res.json({message: "Note deleted"})
})

app.get('/api/test', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(502).json({ error: 'Couldn\'t establish database connection' });
    }
  });

app.listen(port, ()=>{
    console.log("Server is running on port " + port)
})
