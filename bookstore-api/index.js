const express = require('express');
const cors = require('cors');
const session = require('express-session');
const RedisStore = require("connect-redis").default;
const redis = require('redis');
const UserRouter = require('./routes/UserRoute.js');
const BookRouter = require('./routes/BookRoute.js');
const FileUpload = require('express-fileupload');

const app = express();
const redisClient = redis.createClient({
    host: 'redis', 
    port: 6379,
});
redisClient.connect().catch(console.error);
const port = 5000;
app.use(cors());
app.use(FileUpload());
app.use(express.static("public"));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'dd068607abffc41a258037afa23bee162012b5409cf9b4e858ce2b4afdd45275',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 3 * 60 * 60 * 1000,
    } // Set secure to true if using HTTPS
}));
app.use(express.json());
app.use(BookRouter);
app.use(UserRouter);

app.listen(port,() => console.log("Server up and running...."));