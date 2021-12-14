require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const morgan = require('morgan');
const database = require('./databases');
const Route = require('./routers');
const methodOverride = require('method-override');
const cors = require('cors');

const app = express();

database.connect();

app.use(cors({ origin: ['http://localhost:3000'] })); // only allow port api is localhost:3000

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true })); //body handle data from form
app.use(express.json({ limit: '50mb' }));

app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');

Route(app);

require('../auto/sendMail'); // auto resend email

app.listen(process.env.PORT, () => {
  console.log('Server running on port: ' + process.env.PORT);
});

module.exports = app;
