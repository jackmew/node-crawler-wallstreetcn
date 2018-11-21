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
    { no: 'CN', name: '富时A50', search: '富时' },
    { no: 'CL', name: '国际原油', search: '原油' },
    { no: 'HSI', name: '恒指期货', search: '恒指' },
    { no: 'YM', name: '迷你道指', search: '道指' },
    { no: 'NQ', name: '迷你纳指', search: '纳指' },
    { no: 'ES', name: '迷你标普', search: '标普' },
    { no: 'FDAX', name: '德国DAX', search: '德国DAX' },
    { no: 'NK', name: '日经225', search: '日经225' },
    { no: 'MHI', name: '小恒指', search: '恒指' },
    { no: 'GC', name: '美黄金', search: '黄金' },
    { no: 'HHI', name: 'H股指数', search: 'H股' },
    { no: 'MCH', name: '小H股指数', search: 'H股' },
    { no: 'HG', name: '美铜', search: '铜' },
    { no: 'SI', name: '美白银', search: '白银' },
    { no: 'QM', name: '小原油', search: '原油' },
    { no: 'FDXM', name: '迷你德国DAX指数', search: '德国DAX' },
    { no: 'NG', name: '天然气指数', search: '天然气' },
]

module.exports = {
    baseUrl: 'https://wallstreetcn.com',
    baseNewsUrl: 'https://wallstreetcn.com/news',
    newsTypes,
    searchCommodities
};
