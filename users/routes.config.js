const express = require('express');
const UsersController = require('./controllers/users.controllers');
const router = new express.Router();

router.post('/users', [
    UsersController.insert
]);

router.get('/users/:userId', [
    UsersController.getById
]);

router.patch('/users/:userId', [
    UsersController.patchById
]);

router.get('/users', [
    UsersController.list
]);

router.delete('/users/:userId', [
    UsersController.removeById
]);

module.exports = router;