const express = require('express');
const app = express();
const port = 3000;

//Подключаем PUG шаблонизатор
app.set('view engine', 'pug');
//Подключаем папку для клиента со стилями, картинками и js
app.use(express.static(__dirname + '/public'));

//Настройка роутов
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная',
        titleId: 'homepage'
    });
});
app.get('/blog', (req, res) => {
    res.render('blog-list', {
        title: 'Блог',
        titleId: 'blog'
    });
});

//Настраиваем слушатель
app.listen(port, () => {
    console.log(`Express running on port ${port}`);
});