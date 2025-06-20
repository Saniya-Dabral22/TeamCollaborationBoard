const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const taskRoutes = require("./routes/taskRoutes");
const boardRoutes = require("./routes/boardRoutes");

const app = express();


app.use(cors());
app.use(express.json());
 
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes); 
  

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
});
