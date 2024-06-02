const Joi = require('joi')

const schema = Joi.object({
    name: Joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    password: Joi
                .string(),
    confirmPassword: Joi.ref('password'),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})