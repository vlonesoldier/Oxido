const { Worker } = require("worker_threads")
const { FileDescriptor } = require("./fileDescriptor")
const genTemplateThread = new Worker('./generateDocTemplate.js')
const genContentThread = new Worker('./generateDocContent.js')
const fd = new FileDescriptor(null, "./podglad.html")

try {
    genTemplateThread.on('message', (template) => {
        let data = template;
        
        genContentThread.on('message', (content) => {
            data = data.replace(/<body>([^]*?)<\/body>/s, `<body>${content}</body>`)
            fd.writeDataToFile(data)
        })

        genContentThread.on('error', (msg) => {
            console.error(msg)
        })
    })

    genTemplateThread.on('error', (msg) => {
        console.error(msg)
    })

} catch (err) {
    console.error(err)
}