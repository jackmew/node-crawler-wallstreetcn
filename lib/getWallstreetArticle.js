/**
 * 华尔街见闻
 *   內文 - article
 *   https://wallstreetcn.com/articles/3438078
 *   https://wallstreetcn.com/articles/3438073
 */
const DevManager = require('../lib/DevManager')
const cheerio = require('cheerio');
const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const { removeWhitespaceAndNewline, contentTextTransform } = require('../utils/stringUtils')
const config = require('../global/config')

// const devManager = new DevManager()

async function run (articleLink = '/articles/3438073', nightmare) {
    nightmare || (nightmare = Nightmare({ show: true }))
    const url = `${config.baseUrl}${articleLink}`
    await nightmare
        .goto(url)
        // .wait(1000);
    const htmlStr = await nightmare.evaluate(() => document.body.innerHTML)
    
    return {
        // article: devManager.startRepl(htmlStr, true),
        article: getArticle(htmlStr),
        nightmare
    }
}    

function getArticle(htmlStr) {
    const $ = cheerio.load(htmlStr, { decodeEntities: false });

    const title = removeWhitespaceAndNewline($('div.article__heading .article__heading__title').text())
    const summary = removeWhitespaceAndNewline($('div.summary').text())
    const contentRaw = $('div.article__content').html()
    const contentText = contentTextTransform(contentRaw)
    const images = []

    if ($('div.article__content img').length === 1) {
        images.push($('div.article__content img').attr('src'))
    } else if ($('div.article__content img').length > 1) {
        $('div.article__content img').each((idx, ele) => {
            images.push($(ele).attr('src'))
        })
    }

    const article = {
        title,
        summary,
        content: {
            raw: contentRaw,
            text: contentText,
            images
        }
    }
    return article

}

async function start (articleLink) {
    try {
        const { article, nightmare } = await run(articleLink)
        await nightmare.end();
        console.log(article)
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    start,
    run
};
