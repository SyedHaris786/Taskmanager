const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
const erroHandlerMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.static('./public'))
app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(erroHandlerMiddleware)

const start = async () =>{
    try {    
       await connectDB(process.env.MONGO_URI) 
       app.listen(5000,()=> console.log('Server running on port 5000'))
    } catch (error) {
        console.error(error);
    }

    }

    start()