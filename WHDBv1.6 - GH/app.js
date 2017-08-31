const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const index = require('./routes/index.js');
const warehouse = require('./routes/warehouse.js');
const index2 = require('./routes/index2');


var loadsReturned = [];

app.use(bodyParser.urlencoded({
    extended: true
}));

//-----------------------------------------------------------------------------------------app.engine declares pug for view engine---------------------------------------------------------------------------------

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');

//-----------------------------------------------------------------------------------------database connection string----------------------------------------------------------------------------------------------
var connection = mysql.createConnection({
    host: '192.168.1.83',
    port: '3306',
    user: 'sql',
    password: '',
    database: 'whdb'
});

connection.connect(function () {
    console.log('you are now connected to the "Loads" table of WHDB');
});
//------------------------------------------------------------------------------------------regular old base router-------------------------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));
app.use('/', index);
app.use('/warehouse', warehouse);
app.use('/index2', index2);
//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/index.html');
//});



//--------------------------------------------app.post used here to pull data from the body of the POST command.  Then runs query against DB inserting data from req.body--------------------------------------------

app.post('/write', function (req, res, next) {
    connection.query('insert into loads set ?', req.body,
        function (err, result) {
            if (err) {
                console.log(err);
                return next(err);
            }
            console.log("The inserted row was: ", req.body);
            res.render('index');
        });
});


app.post('/get', function (req, res, next) {
   connection.query('SELECT * FROM loads WHERE id = 72;',
       function (err, result, rows) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        res.render('index');
       
   });
});




//-------------------------------------------------------------------------------------------tells express which port to listen on-----------------------------------------------------------------------------------
app.listen(3000, function () {
    console.log("");
});
