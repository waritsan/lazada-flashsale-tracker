const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const Fuse = require('fuse.js')
const mongoose = require('mongoose')
const Item = require('./models/itemModel')

const flashSaleUri = 'https://pages.lazada.co.th/wow/i/th/LandingPage/flashsale'
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lazada'
mongoose.connect(mongodbUri, { useNewUrlParser: true })

async function getFlashSale(uri) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(uri, { waitUntil: 'networkidle2' })
    const html = await page.content()
    await browser.close()
    return html
}

const parseFlashSaleItems = (data) => {
    const $ = cheerio.load(data)
    var items = []
    $('div .item-list-title').each((_, element) => {
        const startTime = $(element).text()
        $(element).next().children('a').each((_, element) => {
            const link = $(element).attr('href')
            const img = $(element).find('.image').attr('data-ks-lazyload')
            const name =  $(element).find('.sale-title').text()
            const salePrice = removeSpaces($(element).find('.sale-price').text().replace(/\s+/g, ''))
            const originPrice = removeSpaces($(element).find('.origin-price-value').text())
            const item = {
                name: name,
                salePrice: salePrice,
                originPrice: originPrice,
                startTime: startTime,
                img: img,
                link: link
            }
            items.push(item)
        })
    })
    return items
}

const removeSpaces = (str) => {
    return str.replace(/\s+/g, '')
}

const findItem = (myItem, flashSaleItems) => {
    const fuse = new Fuse(flashSaleItems, {
        shouldSort: true,
        threshold: 0.3,
        keys: ['name']
    })
    const foundItems = fuse.search(myItem.name)
    return foundItems
}

const getMyItems = async () => {
    const myItems = Item.find().exec()
    return myItems
}

const lookForItems = async () => {
    const data = await getFlashSale(flashSaleUri)
    const flashSaleItems = parseFlashSaleItems(data)
    const myItems = await getMyItems()
    const myItemsInFlashSale = myItems.map(myItem => findItem(myItem, flashSaleItems))
    console.log(myItemsInFlashSale)
}

lookForItems('Samsung')