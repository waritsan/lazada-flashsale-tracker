const mongoose = require('mongoose')
const Item = require('../models/itemModel')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lazada'

mongoose.connect(mongodbUri, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    const item = new Item({ 
        name: process.argv[2],
        price: process.argv[3]
    })
    item.save((err, item) => {
        if (err) return console.error(err)
        console.log(item)
        db.close()
    })
})
