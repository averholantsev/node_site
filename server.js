//Подключаем express
const express = require('express');
const app = express();
const port = 3000;
//Использование контроллеров
const blog_controller = require('./controllers/blog.controller');
//Подключаем mongoose
const mongoose = require('mongoose');
//Подключаем body-parser
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
//Подкючаем загрузщик файлов
const fileUpload = require('express-fileupload');
//Подключаем отправщик email
const nodemailer = require('nodemailer');

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
//Настройка почтового клиента
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'oauth2',
        user: 'verkholantsevad@gmail.com',
        clientId: '176326841217-6jp1njc9e45j67m8l4lhrgocre607hm4.apps.googleusercontent.com',
        clientSecret: 'xpcV1ztLIYO1nSvQ10TcybOs',
        refreshToken: '1/5PCabUo6SN6r2Ho3_55LEagoygjadyFJVcHhOROkxGs',
    }
});
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

//Роут: Контакты
app.get('/contacts', (req, res) => {
    res.render('contacts', {
        title: 'Контакты',
        titleId: 'contacts'
    });
});
app.post('/contacts-post', urlencodedParser, (req, res, next) => {
    res.send(req.body);
    var mailOptions = {
        from: 'site-test@gmail.com',
        to: 'verkholantsevad@gmail.com',
        subject: 'Sending Email using Node.js',
        text: req.body
    };
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(res));
        }
    });
});

//Настраиваем слушатель
app.listen(port, () => {
    console.log(`Express running on port ${port}`);
});