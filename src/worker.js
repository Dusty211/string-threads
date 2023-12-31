const {parentPort, workerData} = require('worker_threads')
const {prepareFileFunctions} = require('./prepare-file-functions')

;(function ({inputFormat, functionsFilePath}) {
    const fileFunctions = prepareFileFunctions(functionsFilePath)
    parentPort.on('message', ({index, string}) => {
        const newlineObject = inputFormat === 'json' ? JSON.parse(string) : string
        const result = {index}
        result.data = {}
        for (const [fileName, fileFunction] of Object.entries(fileFunctions)) {
            result.data[fileName] = fileFunction(index, newlineObject)
        }
        parentPort.postMessage(result)
    })
})(workerData)
