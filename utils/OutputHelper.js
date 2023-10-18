const { appendFile } = require('node:fs/promises')
const path = require('path')

function OutputHelper(outputDir){
    this.outputDir = outputDir
    this.fileTimestamp = Date.now()

    this.writeBuffersToFiles = async function(workerThreadResults){
        const createFilePath = fileName => path.join(this.outputDir, `${this.fileTimestamp}-${fileName}`)
        const appendDataPromises = workerThreadResults.flat(Infinity).flatMap(result => {
            Object.entries(result).map( ([tableName, arrayBuffer]) => 
                appendFile(createFilePath(tableName), arrayBuffer.buffer))
        })
        await Promise.all(appendDataPromises)
        return this
    }
}

module.exports = {OutputHelper}