const { FileDescriptor } = require('./fileDescriptor');
const { openAIAgent } = require('./openAIAgent');
const { parentPort } = require('worker_threads')

const fd = new FileDescriptor('./text_for_article.txt', './artykul.html')
const dataFile = fd.getDataFromFile()
let message = `Prepare well organised content of the body (without body tags) 
            inside the html document based on an attached article. Suggest the best place 
            in a text to put in an image including its source - "image_placeholder.jpg", 
            and the alternate text that neatly describes what the image represents. 
            Remember about wrapping up the image with the caption below in a figure tag.
            
            Article:
            ${dataFile}`;
            
(async () => {

    const responseFromAssistant = await openAIAgent.getResponseFromAssistant(message)
    fd.writeDataToFile(responseFromAssistant)
    parentPort.postMessage(responseFromAssistant)
})()