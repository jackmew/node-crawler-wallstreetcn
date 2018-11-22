const newsTypes = [
    { name: 'global', title: '最新' }, 
    { name: 'shares', title: '股市' }, 
    { name: 'bonds', title: '债市' }, 
    { name: 'commodities', title: '商品' }, 
    { name: 'forex', title: '外汇' }, 
    { name: 'enterprise', title: '公司' }, 
    { name: 'economy', title: '经济' }, 
    { name: 'charts', title: '数据' }, 
    { name: 'china', title: '中国' },
    { name: 'us', title: '美国' }, 
    { name: 'europe', title: '欧洲' }, 
    { name: 'japan', title: '日本' }
]

const searchCommodities = [
    { commodityNo: 'CN', commodityName: '富时A50', search: '富时' },
    { commodityNo: 'CL', commodityName: '国际原油', search: '原油' },
    { commodityNo: 'HSI', commodityName: '恒指期货', search: '恒指' },
    { commodityNo: 'YM', commodityName: '迷你道指', search: '道指' },
    { commodityNo: 'NQ', commodityName: '迷你纳指', search: '纳指' },
    { commodityNo: 'ES', commodityName: '迷你标普', search: '标普' },
    { commodityNo: 'FDAX', commodityName: '德国DAX', search: '德国DAX' },
    { commodityNo: 'NK', commodityName: '日经225', search: '日经225' },
    { commodityNo: 'MHI', commodityName: '小恒指', search: '恒指' },
    { commodityNo: 'GC', commodityName: '美黄金', search: '黄金' },
    { commodityNo: 'HHI', commodityName: 'H股指数', search: 'H股' },
    { commodityNo: 'MCH', commodityName: '小H股指数', search: 'H股' },
    { commodityNo: 'HG', commodityName: '美铜', search: '铜' },
    { commodityNo: 'SI', commodityName: '美白银', search: '白银' },
    { commodityNo: 'QM', commodityName: '小原油', search: '原油' },
    { commodityNo: 'FDXM', commodityName: '迷你德国DAX指数', search: '德国DAX' },
    { commodityNo: 'NG', commodityName: '天然气指数', search: '天然气' },
]

module.exports = {
    baseUrl: 'https://wallstreetcn.com',
    baseNewsUrl: 'https://wallstreetcn.com/news',
    baseSearchUrl: 'https://wallstreetcn.com/search?q=',
    newsTypes,
    searchCommodities
};
