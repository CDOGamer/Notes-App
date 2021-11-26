// Imports...
const express = require('express')
const fs = require('fs').promises
var cors = require('cors')
var bp = require('body-parser')
const asyncHandler = require('express-async-handler')

// Set up
const app = express()
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
const port = 3000

// Functions
async function readFromFile(file){
  var fileData = await fs.readFile(file, 'utf8' , (err, data) => {
    if (err) return err;
  })
  return new Buffer(fileData);
}

function writeToFile(file, data){
  fs.writeFile(file, JSON.stringify(data), err => {
    if (err) return err
  })

}

app.get('/getNotes', asyncHandler(async (req, res) => {
    // fs.readFile('notes.json', 'utf8' , (err, data) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     const notes = JSON.parse(data);
    //     res.send(JSON.stringify(notes))
    //   })
    //var data = await readFromFile('notes.json').then(console.log(data))
    data = await readFromFile('notes.json')
    res.send(data)
}))

app.post('/addNote', asyncHandler(async (req, res) => {
    /* console.log(req.body)
    fs.readFile('notes.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        const notes = JSON.parse(data);
        notes.push(req.body.note)
        fs.writeFile('notes.json', JSON.stringify(notes), err => {
            if (err) {
              console.error(err)
              return
            }
            res.send(JSON.stringify("Successfully added"))
          })
      }) */
      const notesRaw = await readFromFile('notes.json')
      const notes = JSON.parse(notesRaw)
      notes.push(req.body.note)
      writeToFile('notes.json', notes)
      res.send(JSON.stringify("Successfully added"))
}))

app.delete('/deleteNote', async (req, res) => {
    /* fs.readFile('notes.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        const notes = JSON.parse(data);
        notes.splice(req.body.index, 1)
        fs.writeFile('notes.json', JSON.stringify(notes), err => {
            if (err) {
              console.error(err)
              return
            }
            res.send(JSON.stringify("Successfully delete"))
          })
      }) */
      const notesRaw = await readFromFile('notes.json')
      const notes = JSON.parse(notesRaw)
      notes.splice(req.body.index, 1)
      writeToFile('notes.json', notes)
      res.send(JSON.stringify("Successfully added"))
})

app.listen(port, () => {
  console.log(`Notes listening on http://localhost:${port}`)
})