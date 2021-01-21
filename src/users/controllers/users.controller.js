const UserModel = require("../models/users.model");
const crypto = require('crypto');

exports.insert = async (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = salt + '$' + hash;
    req.body.permissionLevel = 1;
    
    let userCreated = await UserModel.createUser(req.body)
    
    if (userCreated) {
        res.status(201).send({ id: userCreated._id });
    } else {
        res.status(403).send('Email is already being used.');
    }
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId).then((result) => {
        res.status(200).send(result);
    });
};

exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
        req.body.password = salt + '$' + hash;
    }
    UserModel.patchUser(req.params.userId, req.body).then((result) => {
        res.status(204).send({})
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;

    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page) === 0 ? 1 : parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? (req.query.page - 1) : 0;
        }
    }
    UserModel.list(limit, page).then((result) => {
        res.status(200).send(result);
    });
};

exports.removeById = (req, res) => {
    UserModel.removeById(req.params.userId).then((result) => {
        res.status(204).send({});
    })
};