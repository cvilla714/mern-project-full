const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
const connectDB = require('./config/db')

require('dotenv').config({path: './config/.env'});
require('./config/db');

connectDB()


const {ckeckUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    Credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'prefFlightContinue': false
    

};


app.use(cors(corsOptions))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jtw
app.get('*', ckeckUser);
app.get('/jtwid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


//server
if(process.env.MODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/client/build")))

   app.get('*', (req, res) => {
       res.sendFile(path.join(__dirname, "client" , "build" , "index.html"));
   })
} else {
    app.get('/', (req, res) => {
        res.send("Api running")
    })
}


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
});