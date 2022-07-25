const express = require('express');
const path = require("path");
const { default: mongoose } = require('mongoose');

const app = express()
const port = 3000
const config = require('./config/key.js')

app.use(express.static(path.join(__dirname, '../client/build')))
app.use("/image", express.static("./image"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/post", require("./Router/post.js"))
app.use("/api/user", require("./Router/use.js"))

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI).then(() => {
      console.log(`Example app listening on port ${port}`)
      console.log("Connected to MongoDB")
  }).catch(err => {
    console.log(`${err}`)
  })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

