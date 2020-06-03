const express = require("express");
const app = express();
const fs = require("fs")
const path = require("path")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
const PORT = process.env.PORT || 6312
let notes = require('./db/db.json')
//Routes///
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/notes.html"))
})
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/index.html"))
// })

app.get("/api/notes",(req, res)=>{
  return res.json(notes);
})
app.delete("/api/notes/:id",(req, res)=>{
  const id = parseInt(req.params.id)
  const newArray = notes.filter(note => note.id !== id)
  fs.writeFile("./db/db.json", JSON.stringify(newArray), err =>{
    if (err) console.log(err)
    notes = newArray
    res.sendStatus(200)
  })
})

app.post("/api/notes", (req,res)=>{
  const newNote = req.body
  if(notes.length){
    newNote.id = notes[notes.length-1].id+1
  }else{
    newNote.id = 1
  }
  notes.push(newNote)

  fs.writeFile("./db/db.json", JSON.stringify(notes), err =>{
    if (err) console.log(err)
    res.sendStatus(200)
  })
})

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });