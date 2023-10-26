const fs = require("fs");
const { Transform } = require('stream');

const transformer = new Transform({
    transform(chunk, encoding, callback) {
        let newText = "";
        let sentences = Array.from(chunk.toString().split(" "));
          
        sentences.forEach(words => {
            if (words !== "@" && words !== "^" && words !== "%" && words !== "*" && words !== "$")
            {
                newText += words;
                newText += " ";
            }
        });

        this.push(newText);  // передача преобразованных данных
        callback();

    }
});

const readable = fs.createReadStream('./text.txt');
const writable = fs.createWriteStream('./text2.txt');

readable.pipe(transformer).pipe(writable);

