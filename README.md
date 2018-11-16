# node-crawler-cn-Wallstreet

A node crawler using [cheerio](https://github.com/cheeriojs/cheerio) & [nightmare](https://github.com/segmentio/nightmare) to scrape the news & the article of news from [wallstreetcn](https://wallstreetcn.com/news/global), and save the data to json file.   

![wallstreetcn](https://github.com/jackmew/node-crawler-wallstreetcn/blob/master/screenshot/wallstreetCn.png?raw=true)

## Installation

```
npm install node-crawler-wallstreetcn
```

## Usage  
```
node index.js
```  

Specify:   
newstype: [global,shares,bonds,commodities,forex,enterprise,economy,charts,china,us,europe,japan]  
numOfRecord: 5  

```
node index.js forex 10
```  

Dev mode to show the log  .

```
DEBUG=nightmare node index.js commodities 8
```  

Then it will save json file to /output.


