"use strict";
/* -------------------------------------------------------
    EXPRESSJS - LIBRARY Project with Sequelize
------------------------------------------------------- */

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    },
    dialectModule: require('pg')
  });

const Library = sequelize.define('Books', {
    title: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING(20), // Veya DataTypes.BIGINT
        unique: true
    },
    genre: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

(async () => {
  await sequelize.sync({ alter: true }); // Tabloyu günceller, yoksa oluşturur
})();

sequelize
    .authenticate()
    .then(() => console.log('* DB Connected *'))
    .catch(err => console.log('* DB Not Connected *', err)); // Hata mesajını konsola yazdırın

module.exports = Library;
