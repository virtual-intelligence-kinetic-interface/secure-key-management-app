var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    var token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ response_code:403, response_message: 'No token provided.',response_body:null });

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err)
            return res.status(500).send({ response_code:500, response_message: 'Failed to authenticate token.',response_body:null });
       
        req.userDetails = decoded;      
        next();
    });
}

module.exports = verifyToken;