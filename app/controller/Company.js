const companyModel = require('../models/company');

//create company and save
exports.companyCreate = async function (req,res) {
    if(!req.body){
        res.send("error");
    }
    else {
        const company = new companyModel(req.body);
        await company.save();
        res.send("company saved");
    }
}

//find all companies
exports.findAllCompany = async function(req,res){
    const companies = await companyModel.find();
    res.send(companies);
}

//find company by id
exports.findCompanyById = async function(req,res){
    const company = await companyModel.findById(req.params.id);
    if(company)
        res.send(company);
    else
        res.send("company not found");
}

//update company
exports.updateCompany = async function (req,res) {
    const company = await companyModel.findById(req.params.id).updateOne(req.body);
    if(company){
        res.send("updated name");
    }
    else{
        res.send("error");
    }

    
}

//delete company
exports.deleteCompany = async function (req,res) {
    let company = companyModel.findById(req.params.id);
    await company.deleteOne();
    company = await companyModel.findById(req.params.id);
    if(company){
        res.send("error");
    }else{
        res.send("deleted company");
    }
}