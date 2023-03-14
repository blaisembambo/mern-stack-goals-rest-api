const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const mongoDB = require('./config/db')


const port = process.env.PORT || 4000
const app = express()
mongoDB()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users',require('./routes/userRoutes'))

app.use(errorHandler);


app.listen(port,() => console.log(`connected to the port ${port}`))