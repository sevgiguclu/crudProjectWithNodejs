const express = require('express');
const router = express.Router();

const companyController = require('../controller/Company');

router.get('/',companyController.findAllCompany);
router.get('/findcompanybyid/:id',companyController.findCompanyById);
router.post('/',companyController.companyCreate);
router.patch('/updatecompany/:id',companyController.updateCompany);
router.delete('/deletecompany/:id',companyController.deleteCompany);



module.exports = router;