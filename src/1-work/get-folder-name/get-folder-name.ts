const path = require('path')
const fs = require('fs')

const readersPath = path.join(__dirname, 'readers')
// console.log('readersPath :>> ', readersPath)
const readersFolders = fs.readdirSync(readersPath)
fs.writeFileSync('file', JSON.stringify(readersFolders, null, 2), { encoding: 'utf8' })
