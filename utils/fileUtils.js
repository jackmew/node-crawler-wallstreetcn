/**
 * https://stackoverflow.com/questions/31978347/fs-writefile-in-a-promise-asynchronous-synchronous-stuff
 */

const fs = require('fs').promises;

async function writeJsonFile (fileName, json) {
    try {
        await fs.writeFile(`output/${fileName}.json`, json);
        console.log(`${fileName}.json has been saved.`)
    } catch (err) {
        throw Error(`Save ${fileName}.json error`)
    }
}

module.exports = {
    writeJsonFile
}