"use strict";
/* -------------------------------------------------------
    EXPRESSJS - LIBRARY Project with Sequelize
------------------------------------------------------- */

const router = require('express').Router()

const library = require('../controllers/library.controller')

router.route('/').get(library.list).post(library.create)
router.route('/:id').put(library.update).delete(library.delete)

module.exports = router