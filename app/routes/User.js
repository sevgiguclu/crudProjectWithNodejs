
const express = require('express');
const userController = require('../controller/User');
const router = express.Router();
const { check} = require('express-validator');

const userValidation = [
    check('name','name cannot be empty').trim().notEmpty(),
    check('email','invalid email').isEmail(),
    check('company','company is required').notEmpty()
];


router.post('/',userValidation,userController.userCreate);
router.get('/',userController.findAllUser);
router.get('/finduserbyname/:name',userController.findUserByName);
router.get('/finduserbyid/:id',userController.findUserById);
router.delete('/deleteuser/:id',userController.deleteUser);
router.patch('/updateuser/:id',userController.updateUserValues);

module.exports = router;