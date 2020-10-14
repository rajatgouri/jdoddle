const express = require('express');
const app = express();
const path = require('path')

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/public', express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req,res,next) => {
    res.render('pages/home');
})

const port = process.env.PORT || 8100;


app.listen(port, () => {
    console.log('App is Running!')
})