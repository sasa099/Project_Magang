const db = require("../models");
const User = db.user;

checkDuplicateFirstnameOrEmail = (req, res, next) => {
    User.findOne({
        firstname:req.body.firstname,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Username Sudah Pernah Terdaftar",
            });
            return;
        }

        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({
                    message: "Email Sudah Pernah Terdaftar",
                });
                return;
            }

            next();
        });
    });
}
const verifySignUp = { checkDuplicateFirstnameOrEmail };
module.exports = verifySignUp;