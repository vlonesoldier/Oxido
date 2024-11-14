const fs = require('node:fs');

class FileDescriptor {
    constructor(fileToOpen, fileToWrite) {
        this.fileToOpen = fileToOpen ? fileToOpen : './text_for_article.txt'
        this.fileToWrite = fileToWrite ? fileToWrite : './artykul.html'
    }

    getDataFromFile() {
        try {
            return fs.readFileSync(this.fileToOpen, 'utf8');
        } catch (err) {
            console.error(err);
        }
    }

    writeDataToFile(content) {
        try {
            fs.writeFileSync(this.fileToWrite, content);
          } catch (err) {
            console.error(err);
          }
    }
}

module.exports = { FileDescriptor }
