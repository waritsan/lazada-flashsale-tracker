const request = require('request').defaults({jar: true})
const fs = require('fs')

const uri = 'https://pages.lazada.co.th/wow/i/th/LandingPage/flashsale'

request.get(uri, (err, res, body) => {
    if (err) return console.log(err)
    fs.writeFile('./result.html', body, err => {
        if (err) console.log(err)
    })
})