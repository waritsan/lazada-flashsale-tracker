const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')

const flashSaleUri = 'https://pages.lazada.co.th/wow/i/th/LandingPage/flashsale'

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

const findItem = (itemName, items) => {
    // TODO
}

async function lookForItems(itemName) {
    const data = await getFlashSale(flashSaleUri)
    const items = parseFlashSaleItems(data)
    findItem(itemName, items)
    console.log(items)
}

lookForItems('Samsung')