// Requiring all mpodules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require ('dotenv').config();
const helmet = require('helmet');
const cors = require('cors')
const novelRoutes = require('./routes/novelRoutes');

// using a port number to connect to a server
const PORT = process.env.PORT || 7000

// Assigning a variable to express
const app = express();

// Connecting to middlewares

// serving static files
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use (cors(
    {
    origin: 'http://localhost:3000',
    methods: "PUT, POST, DELETE, GET",
    // credentials: true,
    // optionSuccessStatus:200
}
));

app.use('/api/novels', novelRoutes);


// connecting to the database
mongoose.connect(process.env.MONGO_URi, {useNewUrlParser: true,
    useUnifiedTopology:true}).then(result => {
        console.log('mongodb connected')
    }).catch(err => {
        console.log(err)
    });


    
app.listen(PORT,() => {
    console.log(`server running on ${PORT}`)
});
