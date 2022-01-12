const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require("../models");
//const User = require('../model/user.model.js');

exports.login = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: `Invalid credentials`
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, response) => {
        if (err) {
          return res.status(401).json({
            message: 'Invalid credentials'
          })
        }
        if (response) {
          const token = jwt.sign({
            email: user[0].email,
            userId: user[0]._id
          },
            'secret',
            {
              expiresIn: "1h"
            })
          return res.status(200).json({
            message: 'auth successful',
            token: token
          })
        }
        return res.status(401).json({
          message: 'Invalid credentials'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.signUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log('user already exists')
        return res.status(422).json({
          message: 'user email exists already'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash,
              
            })
            user.save()
              .then(result => {
                res.status(201).json({
                  message: 'user created'
                })
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                })
              })
          }
        });
      }
    })
}