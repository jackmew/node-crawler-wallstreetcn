const getWallstreetNews = require('./lib/getWallstreetNews')
const getWallstreetArticle = require('./lib/getWallstreetArticle')
const getWallstreetNewsAndArticle = require('./lib/getWallstreetNewsAndArticle')
// getWallstreetNews.start()
// getWallstreetArticle.start('/articles/3438434')
// getWallstreetNewsAndArticle.start()

const args = (process.argv.slice(2))
let newsTypes = getWallstreetNews.newsTypes[0]
let numOfRecord = 5

// 第一個參數判斷
if (args[0]) {
    if (getWallstreetNews.newsTypes.indexOf(args[0]) === -1) {
        console.log(`First argument options: [${getWallstreetNews.newsTypes.toString()}]`)
        return
    }
    newsTypes = args[0]
}

// 第二個參數判斷
if (args[1]) {
    if (isNaN(args[1])) {
        console.log(`Second argument is number of record you want to scrape.`)
        return
    }
    numOfRecord = Number(args[1])
}

getWallstreetNewsAndArticle.start(newsTypes, numOfRecord)

