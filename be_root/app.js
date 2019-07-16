const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const clinetsRouter = require('./routes/clients');
const plansRouter = require('./routes/plans');
const mongoose = require('mongoose');
const config = require('./config/db');
const cors = require('cors');
const Cookie = require('express-session')


app.use(Cookie({secret: 't1!i2@k3#v4$a5%', cookie: {maxAge: 50000}}))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.mongoURL, { useNewUrlParser: true }, (err) => {
    if (err) throw err;
    console.log('mongo connect success');
})


app.use('/clients', clinetsRouter);
app.use('/plans', plansRouter);


// app.get('/', function (req, res) {
// })

app.listen(8000);