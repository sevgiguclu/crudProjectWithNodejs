
const express = require('express');
const userController = require('../controller/User');
const router = express.Router();
// const {check} = require('express-validator');
const {validate} = require('express-validation');
const userValidation = require('../validation/validation');
const userAuth = require('../auth/auth');

// const oldpass = ['1234','admin'];
// const registerValidation = [
//     check('name','name cannot be empty').trim().notEmpty(),
//     check('email','invalid email').isEmail(),
//     check('password','invalid password').isLength({min:4}).notEmpty(),
//     check('password','old password cannot be used').not().isIn(oldpass),
//     check('company','company is required').notEmpty()
// ];



// router.post('/register',registerValidation,userController.userCreate);
router.post('/register',validate(userValidation.registerValidation,{},{}),userController.userCreate);
router.post('/login',userController.userLogin);
router.get('/',userController.findAllUser);
router.get('/finduserbyname/:name',userController.findUserByName);
router.get('/finduserbyid/:id',userController.findUserById);//without authatication
router.post('/finduserbyidwithauth/:id',userAuth.authMiddleware,userController.findUserById);//with authatication
router.delete('/deleteuser/:id',userController.deleteUser);
router.patch('/updateuser/:id',userController.updateUserValues);

module.exports = router;