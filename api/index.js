const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');
let cron = require('node-cron');
let shell = require('shelljs');

const app = express();
app.use(cors()); //For Cross Origin



app.use(express.json({ extend: false }));

//CRON SERVICE
cron.schedule('* * * * *', () => {
    let d = new Date();
    let n = d.toISOString();
    //console.log('Cron Running Every Minute - ' + n);
    if(shell.exec("node cron.js").code !== 0 ) {
        console.log('Cron at - '+ n + ' did not run! Check Error Log!');
    }
});

// Define Routes
app.use('/', require('./routes/root'));
//app.use('/update', require('./routes/update_server'));
app.use('/cron', require('./routes/cron_server'));
app.use('/user', require('./routes/user'));
app.use('/node_data', require('./routes/node_data'));
app.use('/property', require('./routes/property'));
app.use('/controller', require('./routes/controller'));
app.use('/graphs', require('./routes/graphs'));

const PORT = 7988;

//Connect to Database and then server
connectDB(() => app.listen(PORT, () => console.log(`AgroSmart Server Running and Listening at Port ${PORT}`)));