const express = require('express')
const Item = require('../models/itemModel')

router.get('/', (req, res) => {
    Item.find((err, items) => {
        if (err) {
            console.log(err)
            return res.json(err)
        }
        res.json(items)
    })
})