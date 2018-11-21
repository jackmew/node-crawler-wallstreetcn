const moment = require('moment');

/**
 * 移除所有html tag，包含<img />
 * @param {*} htmlString 
 */
const removeHtmlTag = (htmlString) => {
    const strNoTag = htmlString.replace(/<(?:.|\n)*?>/gm, '');
    return strNoTag
}
/**
 * 移除 * 文章出處华尔街见闻 *
 * @param {*} htmlString 
 */
const removeWrittenFromWallstreet = (htmlString) => {
    let newString = htmlString
    const index = htmlString.indexOf('*');
    if (index > -1) {
        newString = htmlString.substring(0, index);
    }
    return newString
}

/**
 * 华尔街见闻 => 内容
 */
const replaceWallstreetText = (text) => {
    const newText = text.replace('华尔街见闻', '内容');
    return newText
}

const contentTextTransform = (htmlString) => {
    const newHtmlString = removeHtmlTag(htmlString)
    const newHtmlString2 = removeWrittenFromWallstreet(newHtmlString)
    const newHtmlString3 = replaceWallstreetText(newHtmlString2)
    return newHtmlString3
}

const removeWhitespaceAndNewline = (htmlString) => {
    const newHtmlString = htmlString.replace(/\s/g,'')
    return newHtmlString
}
/**
 * 資料庫存 2018-11-14 10:36
 * xx分钟前 ==> 當前的時間 - xx分钟前
 * xx小时前 ==> 當前的時間 - xx小时前
 * 1天前 ==> 當前抓到的時間 - 1天前
 */
const dateTimeTransform = (currentDateTime, dateTimeStr) => {
    if (dateTimeStr.indexOf('分钟前') > -1) {
        const minutes = dateTimeStr.substring(0, dateTimeStr.indexOf('分钟前'))
        return currentDateTime.subtract(minutes, 'minutes').format('YYYY-MM-DD HH:mm')
    } else if (dateTimeStr.indexOf('小时前') > -1) {
        const hours = dateTimeStr.substring(0, dateTimeStr.indexOf('小时前'))
        return currentDateTime.subtract(hours, 'hours').format('YYYY-MM-DD HH:mm')
    } else if (dateTimeStr.indexOf('天前') > -1) {
        const day = dateTimeStr.substring(0, dateTimeStr.indexOf('天前'))
        return currentDateTime.subtract(day, 'day').format('YYYY-MM-DD HH:mm')
    }
    return dateTimeStr
}
/**
 * /articles/3438073 -> 3438073
 * @param {string} link 
 */
const getArticleId = (link) => {
    let articleId = link.substring(1, link.length)
    articleId = articleId.substring(articleId.indexOf('/') + 1, articleId.length)
    return articleId
}


module.exports = {
    removeHtmlTag,
    removeWrittenFromWallstreet,
    removeWhitespaceAndNewline,
    contentTextTransform,
    dateTimeTransform,
    getArticleId
}