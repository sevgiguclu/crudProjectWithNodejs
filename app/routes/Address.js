const express = require('express');
const router = express.Router();

const addressController = require('../controller/Address');


router.get('/',addressController.findAllAddress);
router.post('/',addressController.addressCreate);

module.exports = router;