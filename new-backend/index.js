"use strict";
/* -------------------------------------------------------
    EXPRESSJS - LIBRARY Project with Sequelize
------------------------------------------------------- */

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors({
    origin: '*', // Tüm kaynaklara izin ver
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(express.json())

require('express-async-errors')


app.use('/api/books', require('./app/routes/library.router'))

app.use(require('./app/middlewares/errorHandler'))


app.listen(PORT, () => console.log("Running server on:" + PORT));