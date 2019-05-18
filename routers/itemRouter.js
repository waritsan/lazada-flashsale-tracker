const express = require('express')
const Item = require('../models/itemModel')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hello' })
    // Item.find((err, items) => {
    //     if (err) {
    //         console.log(err)
    //         return res.json(err)
    //     }
    //     res.json(items)
    // })
})

module.exports = router