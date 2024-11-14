require('dotenv').config();
const { OpenAI } = require("openai");
const openai = new OpenAI();

class OpenAIAgent {

    async getResponseFromAssistant(message) {
    
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
        });
    
        return this.removeAnythingButHTMLTag(completion.choices[0].message.content);
    }

    removeAnythingButHTMLTag(content) {

        let trimmedString = content.split('```html');
        trimmedString = trimmedString[1].split('```');

        return trimmedString[0]
    }
}

const openAIAgent = new OpenAIAgent()

module.exports = { openAIAgent }