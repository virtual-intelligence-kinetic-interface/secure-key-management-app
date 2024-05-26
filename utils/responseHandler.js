

exports.sendUnauthorizedReponse = (res, message) => {
    res.status(401).send({
        response_code: 401,
        response_message: "Unauthorized Request",
        response_body: null
    });
}

exports.sendNotFoundReponse = (res, message) => {
    res.status(404).send({
        response_code: 404,
        response_message: message || "Not Found",
        response_body: null
    });
}
exports.sendBadRequestReponse = (res, message) => {
    res.status(400).send({
        response_code: 400,
        response_message: message || "Bad Request",
        response_body: null
    });
}

exports.sendInternalServerErrorReponse = (res, message) => {
    res.status(500).send({
        response_code: 500,
        response_message: message || "Some error occurred" ,
        response_body: null
    });
}

exports.sendSuccessReponse = (res, response, message) => {
    res.status(200).send({
        response_code: 200,
        response_message: message,
        response_body: response || null
    });
}