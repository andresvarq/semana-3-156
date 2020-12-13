const models = require('../models');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = async(req, res, next) => {
    try {
        const user = await models.model.findOne({where: {email: req.body.email}});
        if(user) {
            const validPassword = bcrypt.compareSync(req.body.password, user.password);
            if(validPassword) {
                const token = jwt.sign({
                    id: user.id,
                    user: user.username,
                    email: user.email,
                    rol: user.rol
                }, 'config.secret', {
                    expiresIn: 86400,
                }
                );
                res.status(200).json({
                    auth: true,
                    tokenReturn: token,
                    user: user
                })
            } else {
                res.status(401).json({
                    error: 'Que pasa papi, algo no está bien'
                })
            }
        } else {
            res.status(404).json({
                error: 'Que pasa papi, algo no está bien'
            })
        }
    } catch(error) {
        res.status(505).send({
            message: 'Paila'
        }),
        next();
    }
};