require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const nocache = require('nocache');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const swaggerDocs = require('./swagger.js');
const http = require('http').Server(app);

app.use(cors({ origin: '*' }), (req, res, next) => {
    if (req.url == '/') {
        res.redirect('/docs');
        return;
    }
    next();
});

app.use(express.urlencoded({
    extended: true,
    limit: '50mb'
}));

app.use(express.json({
    limit: '50mb'
}));

app.use(nocache());

app.set('view engine', 'ejs');

global.__basedir = __dirname;

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(passport.initialize());
const session = require('express-session');

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
var dir = './uploads';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

/****** ERROR HANDLER START *******/
function errorHandler(message, req, res, next) {
    const {
        code = 500, msg = ''
    } = message;
    res.status(code).send({
        response_code: code || 500,
        response_message: msg,
        response_body: null,
    });
}
app.use(errorHandler);
/****** ERROR HANDLER END *******/

/**************STATIC ROUTES START******************* */
app.use(express.static(path.join(__dirname, "assets")));
app.use("/public", express.static(path.join(__dirname, 'uploads')));
app.use("/public", express.static(path.join(__dirname, 'assets')));
app.use("/.well-known", express.static(path.join(__dirname, '.well-known')));
/**************STATIC ROUTES END******************* */

/*****AUTH ROUTES START******/
const authRoutes = require('./routes/auth.routes');
app.use(`/api/v1/${process.env.APP_NAME}`, authRoutes);
/*****AUTH ROUTES END******/

/*****USER ROUTES START******/
const userRoutes = require('./routes/user.routes.js');
app.use(`/api/v1/${process.env.APP_NAME}`, userRoutes);
/*****USER ROUTES END******/

const port = process.env.PORT || 2502;

http.listen(port, () => {
    console.log(`app listening on port ${port}!`)
    swaggerDocs(app, port)
});
