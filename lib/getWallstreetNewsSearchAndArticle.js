/**
 * 华尔街见闻
 * 
 * 
 * Worflow:
 * 1.取得news -> 存成news.json
 * 2.iterate news -> 取得對應news的articles -> aricles.json
 * 
 */
const getWallstreetNewsSearch = require('./getWallstreetNewsSearch')
const getWallstreetArticle = require('./getWallstreetArticle')
const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const config = require('../global/config')
const { saveNewsSearchsArticleSeparately } = require('./leanCloud')

async function start (commodityNo, numOfRecord) {
    
    const commodity = config.searchCommodities.find(commodity => {
        return commodity.commodityNo === commodityNo
    })

    try {
        const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
        await run(nightmare, commodity, numOfRecord)
        await nightmare.end();
    } catch (err) {
        console.log(err)
    }
}
async function run (nightmare, commodity, numOfRecord) {
    try {
        const { newsSearchs } = await getNewsSearchs(nightmare, commodity.search, numOfRecord)
        const articles = await getArticles(nightmare, newsSearchs)
        
        await saveNewsSearchsArticleSeparately(newsSearchs, articles, commodity)
        console.log('Save NewsSearchs done')

    } catch (err) {
        console.log(err)
    }
}

async function getNewsSearchs(nightmare, newsTypes, numOfRecord) {
    try {
        const { newsSearchs } = await getWallstreetNewsSearch.run(nightmare, newsTypes, numOfRecord)
        return {
            newsSearchs
        }
    } catch (err) {
        console.log(err)
    }
}
async function getArticles (nightmare, newsSearchs) {
    const articles = []
    for (let i = 0; i < newsSearchs.length; i++) {     
        try {
            const result = await getWallstreetArticle.run(nightmare, newsSearchs[i].articleId)
            articles.push(result.article)   
        } catch (err) {
            console.log(err)
            console.log(`Can't scrape this article: ${newsSearchs[i].articleId}`)
        }
    }
    return articles
}

module.exports = {
    start,
    run,
};
