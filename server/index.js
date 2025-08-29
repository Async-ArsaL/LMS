const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
require('dotenv').config();
const cors = require('cors');

//middleware for cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true                
}));
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());
app.use(cookieParser());


// 👇 uploads folder ko public bana diya
app.use("/uploads", express.static("uploads"));

//import routes for apis
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const profileRoutes = require('./routes/profile');
const studentRoutes = require('./routes/student');
const courseRoutes = require('./routes/course');
const instructorRoutes = require('./routes/instructor');
const adminRoutes = require('./routes/admin');

//mount the api routes
app.use("/api/v1", userRoutes);
app.use("/api/v2", dashboardRoutes);
app.use("/api/v3", profileRoutes );
app.use("/api/v4/student", studentRoutes);
app.use("/api/v5/course", courseRoutes);
app.use("/api/v6/instructor", instructorRoutes);
app.use("/api/v7/admin", adminRoutes);
app.use("/api/admin", adminRoutes);


// start the server
app.listen(PORT, ()=>{
    console.log(`server is started successfully at ${PORT}`)
})

//connect to the database
const {connect} = require('./config/database');
connect();

//default route
app.get('/', (req, res) =>{
    res.send('get all user')
});
