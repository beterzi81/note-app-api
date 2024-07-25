import express from "express";
import cors from "cors";
const pool = require('./db');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

app.get("/api/notes" , async(req,res) =>{
    res.json({ message: "Hello World"})
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
