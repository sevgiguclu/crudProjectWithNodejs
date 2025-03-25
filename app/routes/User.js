
const express = require('express');
const userController = require('../controller/User');
const router = express.Router();



router.post('/',userController.userCreate);
router.get('/',userController.findAllUser);
router.get('/finduserbyname/:name',userController.findUserByName);
router.get('/finduserbyid/:id',userController.findUserById);
router.delete('/deleteuser/:id',userController.deleteUser);
router.patch('/updateuser/:id',userController.updateUserName);

module.exports = router;