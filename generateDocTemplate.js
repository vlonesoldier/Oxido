const { FileDescriptor } = require('./fileDescriptor');
const { openAIAgent } = require('./openAIAgent');
const { parentPort } = require('worker_threads')

const fd = new FileDescriptor(null, './szablon.html')
const message = `Generate template of html document with css styles for headers, paragraphs, images. 
 Template should have professional styling for the content including proper margins like often visited blog sites. 
 Background of the site have to be plain and white hue. Colors must be white-blue intertwined. 
 Don't print out the body section of the html document.`;

(async () => {

    const responseFromAssistant = await openAIAgent.getResponseFromAssistant(message)
    fd.writeDataToFile(responseFromAssistant)
    parentPort.postMessage(responseFromAssistant)
})()