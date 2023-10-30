const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/upload', upload.single('myfile'), (req, res) => {
    if (req.file) 
    {
        res.send('Файл загружен');
    } 
    else 
    {
        res.send('Ошибка при загрузке');
    }
});

app.listen(3000, () => {
    console.log('Ok');
});
