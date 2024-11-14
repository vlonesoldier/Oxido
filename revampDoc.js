require('dotenv').config();
const { OpenAI } = require("openai");
const { FileDescriptor } = require('./readFile');
const openai = new OpenAI();

async function getResponseFromAssistant(dataFile) {

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "user",
                content: `Prepare well organised content of the body (without body tags) 
                inside the html document based on an attached article. Suggest the best place 
                in a text to put in an image including its source - "image_placeholder.jpg", 
                and the alternate text that neatly describes what the image represents. 
                Remember about wrapping up the image with the caption below in a figure tag.
                
                Article:
                ${dataFile}`,
            },
        ],
    });

    return completion.choices[0].message.content;
}

(async () => {
    const fd = new FileDescriptor()
    const dataFile = fd.getDataFromFile()
    const responseFromAssistant = await getResponseFromAssistant(dataFile)
    fd.writeDataToFile(responseFromAssistant)
    console.log(responseFromAssistant)
})()