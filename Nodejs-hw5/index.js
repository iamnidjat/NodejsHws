const fs = require("fs");

fs.readFile("text.txt", 'utf-8', (error, data) => {
  if (error) {
    throw err;
  }

  let sentences = Array.from(data.split("."));

  let keyWord = "внутренние"; // change to what you want

  sentences.forEach(words => {
    words.split(' ').forEach(word => {
        if (word === keyWord)
        {
            console.log(words.split(' ').join(' ') + '.');
        }
    })
  });
});