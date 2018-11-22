const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const getWallstreetNewsSearchAndArticle = require('./lib/getWallstreetNewsSearchAndArticle')
const { searchCommodities } = require('./global/config')
/**
 * iterate all newsTypes
 * 爬全部類型文章
 */
async function start () {
    const numOfRecord = 3
    
    const nightmare = Nightmare({ show: true });     // show:true  显示内置模拟浏览器
    
    for (let i = 0; i < searchCommodities.length; i++) {
        try {
            const commodity = searchCommodities[i]
            await getWallstreetNewsSearchAndArticle.run(nightmare, commodity, numOfRecord)
        } catch (err) {
            console.log(err)
        }
    }
    await nightmare.end();
}
start()