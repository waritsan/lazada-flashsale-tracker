const puppeteer = require('puppeteer')
const fs = require('fs')

const uri = 'https://pages.lazada.co.th/wow/i/th/LandingPage/flashsale'

async function getFlashSale() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(uri, { waitUntil: 'networkidle2' })
  const html = await page.content()
  fs.writeFileSync('flash-sale.html', html)
  await browser.close()
}

getFlashSale()