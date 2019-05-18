const express = require('express')
const Item = require('../models/itemModel')
const router = express.Router()

router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err) {
            console.log(err)
            return res.json(err)
        }
        res.json(items)
    })
})