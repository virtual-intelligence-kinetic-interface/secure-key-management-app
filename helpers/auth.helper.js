const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var path = require('path');
const fs = require('fs');
const crypto = require('crypto');



exports.GenerateJWTToken = (username, email, Id) => {
    return jwt.sign({
        Id: Id,
        username: username,
        email: email
    }, process.env.SECRET, {
        expiresIn: '3h'
    });
}

exports.HashPassword = async (password) => {
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

exports.FsReadFileHtml = async (fileName) => {
    const content = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__basedir, fileName), 'utf8', (error, htmlString) => {
            if (!error && htmlString) {
                resolve(htmlString);
            } else {
                reject(error)
            }
        });
    });

    return content;
}