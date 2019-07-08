//Подключаем express
const express = require('express');
const app = express();
const port = 3000;
//Использование контроллеров
const blog_controller = require('./controllers/blog.controller');
const contacts_controller = require('./controllers/contacts.controller');
//Подключаем mongoose
const mongoose = require('mongoose');
//Подключаем body-parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Подкючаем загрузщик файлов
const fileUpload = require('express-fileupload');
//Используем файловый приемщик с форм
app.use(fileUpload());
//Используем PUG шаблонизатор
app.set('view engine', 'pug');
//Используем папку для клиента со стилями, картинками и js
app.use(express.static(__dirname + '/public'));
//Настройка подключения к БД
let dev_db = 'mongodb://localhost:27017/nodeSite';
mongoose.connect(dev_db, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Для почтового клиента
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Роут: Главная страница
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        titleId: 'homepage'
    });
});
//Роут: Страницы блога
app.get('/blog', blog_controller.blog_list);
app.get('/blog/record', blog_controller.blog_record);
app.get('/blog-list-add', blog_controller.blog_insert);
app.post('/blog-list-post', urlencodedParser, blog_controller.blog_create);
app.get('/blog/search', blog_controller.blog_search);

//Роут: Контакты
app.get('/contacts', contacts_controller.contacts);
app.post('/contacts-post', urlencodedParser, contacts_controller.send_comment);

//Настраиваем слушатель
app.listen(port, () => {
    console.log(`Express running on port ${port}`);
});