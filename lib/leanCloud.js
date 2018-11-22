const AV = require('leancloud-storage')
AV.init('ncel39Fbdlx9vCykmmRDb8Yp-gzGzoHsz', 'nSVw4BURxDFnBeuAtLBW8eaE');

/**
 * @deprecated
 * 
 * saveAll的問題是，save中間，一筆錯誤，之後就不會再做下去
 * 
 * @param {array} newsDatasPassed 
 */
const saveAllNews = async (newsDatasPassed) => {
    const newsAll = []

    const newsDatas = JSON.parse(JSON.stringify(newsDatasPassed))

    newsDatas.forEach(newsData => {
        newsData.time = new Date(newsData.time)

        const articleId = newsData.articleId
        newsData._id = `news${articleId}`
        delete newsData.articleId

        const News = AV.Object.extend('News');
        const news = new News(newsData)

        var newsArticleId = AV.Object.createWithoutData('Article', articleId);
        news.set('articleId', newsArticleId);

        newsAll.push(news)
    })

    try {
        await AV.Object.saveAll(newsAll)
        console.log('Save News All done')
    } catch (err) {
        console.log(err)
    }

}
/**
 * @deprecated
 * 
 * saveAll的問題是，save中間，一筆錯誤，之後就不會再做下去
 * 
 * @param {array} articleDatas 
 */
const saveAllArticles = async (articleDatas) => {
    const articleAll = []

    articleDatas.forEach(articleData => {
        const Article = AV.Object.extend('Article')
        const article = new Article(articleData)
        articleAll.push(article)
    })

    try {
        await AV.Object.saveAll(articleAll)
        console.log('Save Article All done')
    } catch (err) {
        console.log(err)
    }
}
/**
 * @deprecated
 * Article 有設objectId (_id)
 * 所以若是有重複，就會save error．
 * 因此先save article，再save news
 */
const saveNewsArticles = async (newsDatas, articleDatas) => {
    const length = articleDatas.length
    for (let i = 0; i < length; i++) {
        try {
            await saveArticle(articleDatas[i])
            await saveNews(newsDatas[i])
        } catch (err) {
            console.log(`articleId: ${articleDatas[i]._id} save failed`)
            console.log(err)
        }
    }
}
const saveNewsArticlesSeparetely = async (newsDatas, articleDatas) => {
    const length = articleDatas.length
    for (let i = 0; i < length; i++) {
        await saveArticle(articleDatas[i])
        await saveNews(newsDatas[i])
    }
}
const saveArticle = async (articleData) => {
    const Article = AV.Object.extend('Article')
    const article = new Article(articleData)
    try {
        await article.save()
    } catch (err) {
        console.log(err)
    }
}
const saveNews = async (newsDataPassed) => {
    const newsData = JSON.parse(JSON.stringify(newsDataPassed))
    newsData.time = new Date(newsData.time)
    const articleId = newsData.articleId
    newsData._id = `news${newsData.category}${articleId}`
    delete newsData.articleId

    const News = AV.Object.extend('News');
    const news = new News(newsData)
    // pointer
    var newsArticleId = AV.Object.createWithoutData('Article', articleId);
    news.set('article', newsArticleId);
    try {
        await news.save()
    } catch (err) {
        console.log(err)
    }
}

const saveNewsSearchsArticleSeparately = async (newsSearchDatas, articleDatas, commodity) => {
    const length = articleDatas.length
    for (let i = 0; i < length; i++) {
        await saveArticle(articleDatas[i])
        await saveNewsSearchs(newsSearchDatas[i], commodity)
    }
}
const saveNewsSearchs = async (newsSearchDataPassed, commodity) => {
    try {
        const newsSearchData = JSON.parse(JSON.stringify(newsSearchDataPassed))

        newsSearchData.time = new Date(newsSearchData.time)
        const articleId = newsSearchData.articleId
        newsSearchData.commodityNo = commodity.commodityNo
        newsSearchData.commodityName = commodity.commodityName
        newsSearchData._id = `newsSearch-${newsSearchData.commodityNo}-${articleId}`
        delete newsSearchData.articleId
    
        const NewsSearch = AV.Object.extend('NewsSearch');
        const newsSearch = new NewsSearch(newsSearchData)
        // pointer
        var newsArticleId = AV.Object.createWithoutData('Article', articleId);
        newsSearch.set('article', newsArticleId);
        
        await newsSearch.save()
    } catch (err) {
        console.log(err)
    }
}



module.exports = {
    saveNewsArticlesSeparetely,
    saveNewsSearchsArticleSeparately
}