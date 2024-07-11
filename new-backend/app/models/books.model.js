"use strict";
/* -------------------------------------------------------
    EXPRESSJS - LIBRARY Project with Sequelize
------------------------------------------------------- */

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('sqlite:./db.sqlite3')

const Library = sequelize.define('Books', {
    title:{
        type: DataTypes.STRING(256), 
        allowNull: false
    }, //varchar
    author:{
        type: DataTypes.STRING(256), 
        allowNull: false
    }, //varchar
    ISBN: {
        type: DataTypes.INTEGER,
        unique: true
    }, // varchar
    genre:{
        type: DataTypes.STRING(256), 
        allowNull: false
    }, // varchar
    publicationYear:{
        type: DataTypes.INTEGER, 
        allowNull: false
    }, //year
    image: {
        type: DataTypes.TEXT, 
        allowNull: false
    }// text
})


// sequelize.sync({alter:true})

sequelize.authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(() => console.log('* DB Not Connected *'))

module.exports = Library