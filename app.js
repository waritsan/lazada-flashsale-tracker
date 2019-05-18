const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port  = process.env.PORT || 8080

app.set('json spaces', 2)
app.use(bodyParser.json())
app.listen(port, () => console.log(`Lazada flash-sale tracker is listening on port ${port}!`))