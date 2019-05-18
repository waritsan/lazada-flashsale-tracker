const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const fs = require('fs')

const uri = 'https://pages.lazada.co.th/wow/i/th/LandingPage/flashsale'

async function getFlashSale() {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.goto(uri, { waitUntil: 'networkidle2' })
    const html = await page.content()
    await browser.close()
    return html
}

async function lookForItems() {
    const data = await getFlashSale()
    const $ = cheerio.load(data)
    const saleTitleElements = $('div .sale-title')
    saleTitleElements.each((index, saleTitleElement) => {
        const name = $(saleTitleElement).text()
        console.log(name)
    })
}

lookForItems()