/**
 * 华尔街见闻
 * 
 */
const cheerio = require('cheerio');
const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const repl = require('repl');
const moment = require('moment')
const config = require('../global/config')
const { removeWhitespaceAndNewline, dateTimeTransform, getArticleId } = require('../utils/stringUtils')
const DevManager = require('../lib/DevManager')

const devManager = new DevManager()

Nightmare.action('scrollIntoView', function (selector, done) {
    this.evaluate_now((selector) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        document.querySelector(selector).scrollIntoView(true)
    }, done, selector)
})

async function run (nightmare, search, numOfRecord) {
    const url = `${config.baseSearchUrl}${search}`
    await nightmare
        .goto(url)
        .wait(1000);
    const firstIndex = 2
    for (let i = firstIndex; i < firstIndex + numOfRecord; i++) {
        try {
            await nightmare.scrollIntoView(`div.wscn-search__articles div.search-article-item:nth-child(${i})`).wait(1000);
        } catch (err) {
            console.log(err)
        }
    }
    const htmlStr = await nightmare.evaluate(() => document.body.innerHTML)
    
    return {
        // newsSearchs: devManager.startRepl(htmlStr, true),
        newsSearchs: getNewsSearch(search, htmlStr)
    }
}   
/**
 * @param {string} htmlStr 
 */
function getNewsSearch(search, htmlStr) {
    const $ = cheerio.load(htmlStr, { decodeEntities: false });
    // const currentDateTime = moment().format("YYYY-MM-DD HH:mm")
    const currentDateTime = moment(); 
    const news = []
    $('div.wscn-search__articles div.search-article-item').each((idx, ele) => {
        const link = $(ele).find('a').attr('href');
        const $images = $(ele).find('div.wscn-lazyload img')
        const image = $($images.get(1)).attr('src');
        /**
         * /articles/3438073
         * scrollTo 才會得到image -> 不存在image就不要此News
         * link -> 只要取articles/xxxx 開頭的
         */
        if (link.indexOf('articles') === 1 && image) {

            news.push({
                articleId: getArticleId(link),
                title: removeWhitespaceAndNewline($(ele).find('a.wscn-search-article-title').text()),
                content: removeWhitespaceAndNewline($(ele).find('a.wscn-search-article-content').text()),
                editor: removeWhitespaceAndNewline($(ele).find('.user-name').text()),
                time: dateTimeTransform(currentDateTime, $(ele).find('span.time').text()),
                imageSmall: $($images.get(0)).attr('src'),
                image,
                search: search,
            })   
        }
    })
    return news

}
async function start (commodityNo, numOfRecord = 5) {
    
    const commodity = config.searchCommodities.find(commodity => {
        return commodity.commodityNo === commodityNo
    })

    try {
        const nightmare = Nightmare({ show: true });
        const { newsSearchs } = await run(nightmare, commodity.search, numOfRecord)
        await nightmare.end()
    } catch (err) {
        console.log(err)
    }
}

// start('CN', 3)

module.exports = {
    start,
    run
};