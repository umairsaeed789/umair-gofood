const mongoDB = require("./db")
const { connection } = require("./db")
const express = require('express')
const app = express()
// const cors = require('cors');
const port = 5000
mongoDB();
// Middleware to handle CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow React app on localhost:3000
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow these HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Allow these headers
  next();
});

// connection()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

// API routes
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/myorderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
