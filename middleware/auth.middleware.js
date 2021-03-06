const jtw = require('jsonwebtoken');
const UserModel = require('../config/models/user.model');

module.exports.ckeckUser = (req, res, next) => {
    const token = req.cookies.jtw;
    if (token) {
        jtw.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jtw', '', { maxAge : 1 })
                next();
            } else {
               let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;

                next();
            } 

        })
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jtw;
    if (token) {
        jtw.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        console.log('No token')
    }
}