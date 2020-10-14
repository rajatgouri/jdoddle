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



app.listen(8100, () => {
    console.log('App is Running!')
})