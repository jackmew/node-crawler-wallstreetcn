const cheerio = require('cheerio');
const express = require('express');
const repl = require('repl');
const moment = require('moment');


module.exports = class DevManager {

    constructor() {
        this.resText = 'zestlifia dev server'
    }
    startExpress() {
        this.app = express();
        let server = this.app.listen(3000, function () {
            let host = server.address().address;
            let port = server.address().port;
            console.log('Your App is running at http://%s:%s', host, port);
        });
        this.app.get('/', async (req, res, next) => {
            res.send(this.resText)
        });
    }

    setResText(resText) {
        this.resText = resText
    }

    startRepl(htmlStr, isStartExpress = false) {

        if (isStartExpress) {
            this.startExpress()
        }

        this.replContext = repl.start("zestlifia> ", null, null, null, true).context;
        this.replContext.cheerio = cheerio
        this.replContext.$ = cheerio.load(htmlStr, { decodeEntities: false });
        this.replContext.dev = this 
        this.replContext.moment = moment

        return 'testing'
    }
}
