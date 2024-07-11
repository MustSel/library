"use strict";
/* -------------------------------------------------------
    EXPRESSJS - LIBRARY Project with Sequelize
------------------------------------------------------- */

const Library = require('../models/books.model')

module.exports = {

    list: async (req, res) => {

        const data = await Library.findAndCountAll()

        res.status(200).send({
            error: false,
            result: data
        })

    },

    create: async (req, res) => {

        const data = await Library.create(req.body)

        res.status(201).send({
            error: false,
            result: data.dataValues
        })

    },

    update: async (req, res) => {

        const data = await Library.update(req.body, { where: { id: req.params.id } })
    
        res.status(202).send({
            error: false,
            result: data,
            message: (data[0] >= 1 ? 'Updated' : 'Can not Updated.'),
            new: await Library.findByPk(req.params.id) 
        })
    
    },

    delete: async (req, res) => {

        const data = await Library.destroy({ where: { id: req.params.id } })
      
        if (data >= 1) {
            res.sendStatus(204)
    
        } else {
            
            res.errorStatusCode = 404
            throw new Error('Can not Deleted.')
    
        }
    
    }

}