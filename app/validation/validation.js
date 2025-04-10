const { Joi } = require("express-validation");


module.exports = {
    registerValidation: {
        body:Joi.object({
            name: Joi.string().trim().required().messages({"any.required": `"" is a required field`}),
            email:Joi.string().email().required(),
            password: Joi.string().regex(/[a-zA-Z0-9]/).min(4).max(30).required(),
            age: Joi.optional(),
            company:Joi.required(),
            address: Joi.optional(),
            job: Joi.optional()

        })
    }
};