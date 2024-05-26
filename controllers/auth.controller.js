const responseHandler = require('../utils/responseHandler');

const {
    WebAppLogin
} = require('../services/auth.services');

exports.WebAppLogin = async (req, res, next) => {
    try {
        responseHandler.sendSuccessReponse(res, {
            Auth: await WebAppLogin(req.body.username, req.body.password, req.protocol, req.headers.host),
        }, "Success!!!");
    }
    catch (err) {
        responseHandler.sendInternalServerErrorReponse(res, err.message);
    }

}