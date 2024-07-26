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
    const notes = await prisma.note.findMany({
        orderBy:{
            id: "desc"
        }
    })
    res.json(notes)
})

app.post("/api/notes", async(req,res) =>{
    const {title, content} = req.body

    if (!title || !content){
        return res.status(400).json({error: "Title and content are required"})
    }

    try {
      const note = await prisma.note.create({
          data:{
              title,
              content
          }
      })
      res.json(note)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"})
    }
})

app.put("/api/notes/:id", async(req,res) =>{
    const id = parseInt(req.params.id)
    var {title, content} = req.body
    if(!id || isNaN(id)){
        return res.status(400).json({error: "Id must be a valid number!"})
    }
    const originalNote = await prisma.note.findUnique({
        where:{
            id: id
        }
    })
    if(!originalNote){
        return res.status(404).json({error: "Note not found"})
    }

    title = title || originalNote.title
    content = content || originalNote.content
    try {
      const noteUpdated = await prisma.note.update({
          where:{
              id: id
          },
          data:{
              title,
              content
          }
      })
      res.json(noteUpdated)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"})
    }
})

app.delete("/api/notes/:id", async(req,res) =>{
  const id = parseInt(req.params.id)
  if(!id || isNaN(id)){
    return res.status(400).json({error: "Id must be a valid number!"})
  }
    try {
      await prisma.note.delete({
          where:{
              id: id
          }
      })
      res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Something went wrong"})
    }
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
