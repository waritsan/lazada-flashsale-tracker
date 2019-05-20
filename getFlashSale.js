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

async function lookForItems(itemName) {
    const data = await getFlashSale(flashSaleUri)
    const $ = cheerio.load(data)
    $('div .item-list-title').each((index, element) => {
        const startTime = $(element).text()
        $(itemListTitleElement).next().children('a').each((index, itemElement) => {
            const link = $(itemElement).attr('href')
            const img = $(itemElement).find('.image').attr('data-ks-lazyload')
            const name =  $(itemElement).find('.sale-title').text()
            const salePrice = $(itemElement).find('.sale-price').text()
            const originPrice = $(itemElement).find('.origin-price-value').text()
            console.log(originPrice)
        })
    })
}

lookForItems('Samsung')