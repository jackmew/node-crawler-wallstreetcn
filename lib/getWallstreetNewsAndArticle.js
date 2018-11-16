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
const fileUtils = require('../utils/fileUtils')

async function start (newsTypes, numOfRecord) {
    try {
        // news
        const { news, nightmare } = await getWallstreetNews.run(newsTypes, numOfRecord)
        await fileUtils.writeJsonFile(newsTypes, JSON.stringify(news))
        // articles
        await startArticle(news, newsTypes, nightmare)
        
        await nightmare.end();
    } catch (err) {
        console.log(err)
    }
}
async function startArticle (news, newsTypes, nightmare) {
    const articles = []
    for (let i = 0; i < news.length; i++) {     
        try {
            const result = await getWallstreetArticle.run(news[i].link, nightmare)
            articles.push(result.article)   
        } catch (err) {
            console.log(err)
            console.log(`Can't scrape this article: ${news[i].link}`)
        }
    }
    await fileUtils.writeJsonFile(`${newsTypes}Article`, JSON.stringify(articles))
}

module.exports = {
    start
};
