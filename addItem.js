const mongoose = require('mongoose')
const Item = require('./models/itemModel')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lazada'

mongoose.connect(mongodbUri, { useNewUrlParser: true })

const item = new Item({ 
    name: process.argv[2]
})
item.save((err, item) => {
    if (err) return console.error(err)
    console.log(item)
    mongoose.connection.close()
})