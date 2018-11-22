/**
 * 华尔街见闻
 *   資訊 - news
 *   最新 - https://wallstreetcn.com/news/global
 *   股市 - https://wallstreetcn.com/news/shares
 *   債市 - https://wallstreetcn.com/news/bonds
 *   商品 - https://wallstreetcn.com/news/commodities
 *   外匯 - https://wallstreetcn.com/news/forex
 *   公司 - https://wallstreetcn.com/news/enterprise
 *   經濟 - https://wallstreetcn.com/news/economy
 *   數據 - https://wallstreetcn.com/news/charts
 *   中國 - https://wallstreetcn.com/news/china
 *   美國 - https://wallstreetcn.com/news/us
 *   歐洲 - https://wallstreetcn.com/news/europe
 *   日本 - https://wallstreetcn.com/news/japan
 * 
 *  Filter:
 *  scrollTo 才會得到image -> 不存在image就不要此News
 *  link -> 只要取articles/xxxx 開頭的
 */
const cheerio = require('cheerio');
const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const repl = require('repl');
const moment = require('moment')
const config = require('../global/config')
const { removeWhitespaceAndNewline, dateTimeTransform, getArticleId } = require('../utils/stringUtils')
const DevManager = require('../lib/DevManager')

const devManager = new DevManager()

// scrollIntoView & scrollToElement 都可以
// 方法一
// https://github.com/segmentio/nightmare/issues/1142
Nightmare.action('scrollIntoView', function (selector, done) {
    this.evaluate_now((selector) => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        document.querySelector(selector).scrollIntoView(true)
    }, done, selector)
})
// 方法二
// https://menubar.io/nightmare-js
Nightmare.action('scrollToElement', function (selector, done) {
    this.evaluate_now((selector) => {
        document.querySelector(selector).getBoundingClientRect()
        var rect = document.querySelector(selector).getBoundingClientRect();
        var y = ((rect.bottom - rect.top) / 2) + rect.top;
        var x = ((rect.right - rect.left) / 2) + rect.left;
        window.scrollTo(x, y)
    }, done, selector)
})

async function run (nightmare, newsTypes, numOfRecord) {
    const url = `${config.baseNewsUrl}/${newsTypes}`
    await nightmare
        .goto(url)
        .wait(1000);
            // .scrollTo(1000, 0)
            //.scrollToElement('div.news-main > div.news-main > div.article:nth-child(21)')
    const firstIndex = 2
    for (let i = firstIndex; i < firstIndex + numOfRecord; i++) {
        try {
            await nightmare.scrollIntoView(`div.news-main > div.news-main > div.article:nth-child(${i})`).wait(1000);
        } catch (err) {
            console.log(err)
        }
    }
    const htmlStr = await nightmare.evaluate(() => document.body.innerHTML)
    
    return {
        // news: devManager.startRepl(htmlStr, true),
        news: getNews(newsTypes, htmlStr)
    }
}    
/**
 * @param {string} htmlStr 
 */
function getNews(newsTypes, htmlStr) {
    const $ = cheerio.load(htmlStr, { decodeEntities: false });
    // const currentDateTime = moment().format("YYYY-MM-DD HH:mm")
    const currentDateTime = moment(); 
    const news = []
    $('.news-main .article').each((idx, ele) => {
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
                title: removeWhitespaceAndNewline($(ele).find('a.title').text()),
                content: removeWhitespaceAndNewline($(ele).find('a.content').text()),
                editor: removeWhitespaceAndNewline($(ele).find('div.user-name').text()),
                time: dateTimeTransform(currentDateTime, $(ele).find('span.time').text()),
                imageSmall: $($images.get(0)).attr('src'),
                image,
                category: newsTypes,
            })   
        }
    })
    return news

}
function forTestStartREPL(htmlStr) {
    var context = repl.start("cheerio> ", null, null, null, true).context;
    // context.res = res
    context.cheerio = cheerio
    context.$ = cheerio.load(htmlStr, { decodeEntities: false });
}

async function start (newsTypes = 'global', numOfRecord = 5) {
    try {
        const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
        const { news } = await run(nightmare, newsTypes, numOfRecord)
        await nightmare.end()
        console.log(news)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    start,
    run
};
