const express = require('express');
const app = express();
const port = 3000;
// Использование контроллеров
const blog_controller = require('./controllers/blog.controller');
//Константы подключения к БД и схемам
const mongoose = require('mongoose');
//Подключаем body-parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Подкючаем загрузщик файлов
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Подключаем PUG шаблонизатор
app.set('view engine', 'pug');
//Подключаем папку для клиента со стилями, картинками и js
app.use(express.static(__dirname + '/public'));
// Подключение к БД
let dev_db = 'mongodb://localhost:27017/nodeSite';
mongoose.connect(dev_db, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Настройка роутов
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        titleId: 'homepage'
    });
});
app.get('/blog', blog_controller.blog_list);
app.get('/blog/record', blog_controller.blog_record);
app.get('/blog-list-ad', (req, res) => {
    res.render('blog-list-ad', {
        title: 'Блог',
        titleId: 'blog'
    });
});
app.post('/blog-list-post', urlencodedParser, blog_controller.blog_create);

//Настраиваем слушатель
app.listen(port, () => {
    console.log(`Express running on port ${port}`);
});