//Подключаем отправщик email
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      type: 'OAuth2',
      user: 'verkholantsevad@gmail.com',
      clientId: '176326841217-6jp1njc9e45j67m8l4lhrgocre607hm4.apps.googleusercontent.com',
      clientSecret: 'xpcV1ztLIYO1nSvQ10TcybOs',
      refreshToken: '1/9J8nyvUwumoOjgCNe56HiMCkHc0hJ--obJkkH_cxce-A5XRDDKOU4tqEIg3REG-e',
      accessToken: 'ya29.GlsqBwZc0_SRLqiVjuWIH-rBnvaCaxV8D0go7zY21UfTNYl1NcM2pq5Qkrwi21H59HW4rEaFYUNqAGgiw03hRFIZqeUf6R-Lo88QUo-OSH3X_KSfRDSFFRpRVirQ'
  }
});

exports.contacts = (req, res) => {
  res.render('contacts', {
      title: 'Контакты',
      titleId: 'contacts'
  });
};

exports.send_comment = (req, res, next) => {
  res.send(req.body);
  var textMessageComment = '';
  if (!req.body.company) textMessageComment = 'Входящее сообщение с формы комментариев: ' + '<br> Имя: ' + req.body.name + '<br> E-mail: ' + req.body.email + '<br> Комментарий: ' + req.body.comment;
  else textMessageComment = 'Входящее сообщение с формы комментариев: ' + '<br> Имя: ' + req.body.name + '<br> E-mail: ' + req.body.email + '<br> Юридическое лицо: ' + req.body.company + '<br> Комментарий: ' + req.body.comment;
  var mailOptions = {
      from: 'verkholantsevad@gmail.com',
      to: 'verkholantsevad@gmail.com',
      subject: 'Sending Email using Node.js',
      html: textMessageComment
  };
  transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(JSON.stringify(res));
      }
  });
}



