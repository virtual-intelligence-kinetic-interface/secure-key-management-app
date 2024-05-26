const express = require("express");
const router = express.Router();
const cors = require('cors');
const authController = require("../controllers/auth.controller");

/**
    * @openapi
    * '/api/v1/template/auth/login':
    *  post:
    *     tags:
    *     - Auth 
    *     summary: Login as a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - username
    *              - password
    *            properties:
    *              username:
    *                type: string
    *                default: johndoe
    *              password:
    *                type: string
    *                default: johnDoe20!@
    *     responses:
    *      201:
    *        description: Created
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */

router.post(
    "/auth/login",
    [
        authController.WebAppLogin
    ]
);


module.exports = router;