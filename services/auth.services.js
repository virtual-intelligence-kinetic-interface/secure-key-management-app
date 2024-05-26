const bcrypt = require('bcrypt');
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require('../models/index.js');
const crypto = require('crypto');
const moment = require('moment');
const { SendMail } = require("../utils/sendEmail");
const {
    Users
} = require('../models');
const {
    GenerateJWTToken,
    HashPassword,
    FsReadFileHtml
} = require('../helpers/auth.helper.js');
var ejs = require('ejs');



/**********************************MAIN METHODS START**********************************/

const WebAppLogin = async (username, password, protocol, host) => {
    let response = {};

    try {
        const result = await findLoginUserByUsername(username, (protocol + "://" + host));

        if (result) {
            try {

                if (bcrypt.compareSync(password, result.password)) {

                    let token = GenerateJWTToken(result.username, result.email, result.Id);

                    let user = {};

                    user.id = result.id;
                    user.username = result.username;
                    user.firstName = result.firstName;
                    user.lastName = result.lastName;
                    user.email = result.email;

                    response = {
                        user: user,
                        token: token
                    };

                } else {
                    throw "Invalid email/password!!!";
                }

            } catch (error) {
                throw error;
            }
        } else {
            throw 'no user found.';
        }
    }
    catch (err) {
        throw err;
    }

    return response;
}

/**********************************MAIN METHODS END**********************************/





const findLoginUserByUsername = async (username, url) => {

    let result = {};
    try {

        await Users.findOne({
            where: {
                username: username
            },
            raw: true
        }).then((dsResult) => {
            if (dsResult != null) {
                let user = dsResult;
                result = user;
            } else {
                result = dsResult;
            }
        });

    }
    catch (err) {
        throw err;
    }
    return result;
}


module.exports = {
    WebAppLogin
};