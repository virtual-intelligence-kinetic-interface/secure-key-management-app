const bcrypt = require('bcrypt');
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require('../models/index.js');
const crypto = require('crypto');
const moment = require('moment');
const { SendMail } = require("../utils/sendEmail");
const {
    Users
} = require('../models');


