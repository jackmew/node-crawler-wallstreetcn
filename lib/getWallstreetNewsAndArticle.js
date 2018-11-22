/**
 * 华尔街见闻
 * 
 * 
 * Worflow:
 * 1.取得news -> 存成news.json
 * 2.iterate news -> 取得對應news的articles -> aricles.json
 * 
 */
const getWallstreetNews = require('./getWallstreetNews')
const getWallstreetArticle = require('./getWallstreetArticle')
const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
// const fileUtils = require('../utils/fileUtils')
const { saveNewsArticlesSeparetely } = require('./leanCloud')

async function start (newsTypes, numOfRecord) {
    try {
        const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
        await run(nightmare, newsTypes, numOfRecord)
        await nightmare.end();
    } catch (err) {
        console.log(err)
    }
}
async function run (nightmare, newsTypes, numOfRecord) {
    try {
        const { news } = await getNews(nightmare, newsTypes, numOfRecord)
        const articles = await getArticles(nightmare, news, newsTypes)
        
        await saveNewsArticlesSeparetely(news, articles)
        // await fileUtils.writeJsonFile(newsTypes, JSON.stringify(news))
        // await fileUtils.writeJsonFile(`${newsTypes}Article`, JSON.stringify(articles))
    } catch (err) {
        console.log(err)
    }
}

async function getNews(nightmare, newsTypes, numOfRecord) {
    try {
        const { news } = await getWallstreetNews.run(nightmare, newsTypes, numOfRecord)
        return {
            news
        }
    } catch (err) {
        console.log(err)
    }
}
async function getArticles (nightmare, news, newsTypes) {
    const articles = []
    for (let i = 0; i < news.length; i++) {     
        try {
            const result = await getWallstreetArticle.run(nightmare, news[i].articleId)
            articles.push(result.article)   
        } catch (err) {
            console.log(err)
            console.log(`Can't scrape this article: ${news[i].articleId}`)
        }
    }
    return articles
}


module.exports = {
    start,
    run,
};
