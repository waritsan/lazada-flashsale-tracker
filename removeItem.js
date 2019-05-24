const mongoose = require('mongoose')
const Item = require('./models/itemModel')

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lazada'

const itemName = process.argv[2]

mongoose.connect(mongodbUri, { useNewUrlParser: true })

Item.deleteOne({ name: itemName }, err => {
    if (err) return console.error(err)
    console.log(itemName + ' deleted.')
    mongoose.connection.close()
})