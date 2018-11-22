const Nightmare = require('nightmare');          // 自动化测试包，处理动态页面
const getWallstreetNewsAndArticle = require('./lib/getWallstreetNewsAndArticle')
const { newsTypes } = require('./global/config')
/**
 * iterate all newsTypes
 * 爬全部類型文章
 */
async function start () {
    const numOfRecord = 30
    try {
        const nightmare = Nightmare({ show: false });     // show:true  显示内置模拟浏览器
        
        for (let i = 0; i < newsTypes.length; i++) {
            await getWallstreetNewsAndArticle.run(nightmare, newsTypes[i].name, numOfRecord)
        }
        
        await nightmare.end();
    } catch (err) {
        console.log(err)
    }
}
start()