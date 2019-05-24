const mongoose = require('mongoose')
const Item = require('./models/itemModel')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lazada'

mongoose.connect(mongodbUri, { useNewUrlParser: true })

Item.find((err, items) => {
    if (err) return console.error(err)
    console.log(items)
})